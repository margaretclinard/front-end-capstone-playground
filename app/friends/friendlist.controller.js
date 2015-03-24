angular
  .module('ps')
  .controller('FriendController', FriendController)

function FriendController ($http, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.friends = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
    .success(function (data){
      vm.friends = data;
    })
    .then(function (res) {
      console.log(res.data);
      Object.keys(res.data).forEach(function (key) {
        friendPop(key, res.data[key].uid)
      });
    });

  vm.getWishList = function (uid) {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '/wishlist.json')
      .success(function (data) {
        vm.wishlist = data;
      })
  };

  function friendPop(uuid, uid) {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '.json')
      .success(function (data){
        console.log('friends', data);
        data.uid = uid;
        vm.friends[uuid] = data;
      });
  }

  vm.deleteFriend = function (id) {
    $http
      .delete('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends/' + id + '.json')
      .success(function (data) {
        $http
          .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
          .success(function (data){
            console.log(data);
            location.reload(true);
          });
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