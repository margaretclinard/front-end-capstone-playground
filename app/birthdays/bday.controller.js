angular
  .module('ps')
  .controller('BdayController', BdayController);

function BdayController ($http, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.friends = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
    .success(function (data){
       vm.friends = data;
    })
    .then(function (res) {
      Object.keys(res.data).forEach(function (key) {
        friendPop(key, res.data[key].uid);
      });
    });

  function friendPop(uuid, uid) {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '.json')
      .success(function (data){
        data.uid = uid;
        vm.friends[uuid] = data;
      });
  }

  vm.logout =   function () {
    authFactory.logout(function () {
      delete $rootScope.user;
      $location.path('/');
      $scope.$apply();
    });
  };
}