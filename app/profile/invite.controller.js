angular
  .module('ps')
  .controller('InviteController', InviteController);

function InviteController($http, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.users = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users.json')
    .success(function (data){
      vm.users = data;
      console.log(data)
    });

  vm.addFriend = function (id) {
    $http
      .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json', {uid: id})
      .success(function (data) {
        console.log(data);
        vm.friend = data;
      })
  }

  vm.logout =   function () {
    authFactory.logout(function () {
      delete $rootScope.user;
      $location.path('/');
      $scope.$apply();
    });
  };
}