angular
  .module('ps')
  .controller('WishController', WishController)

function WishController ($http, $routeParams, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');
  var uuid = $routeParams.id;

  vm.newWish = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json')
    .success(function (data){
      vm.wishes = data;
    });

  vm.submit = function () {
    vm.newWish.favorite = false;

    $http
      .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json', vm.newWish)
      .success(function (data) {
        $http
          .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json')
          .success(function (data){
            vm.wishes = data;
          });
        $('#myModal').modal('hide')
      });

    vm.newWish= {};
  }

  vm.deleteWish = function (id) {
    $http
      .delete('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist/' + id + '.json')
      .success(function (data) {
        $http
          .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json')
          .success(function (data){
            vm.wishes = data;
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

  // vm.fav = function (uuid) {
  //   vm.newWish.fav = {'favorite': true };

  //   $http
  //     .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist/' + uuid + '.json', vm.newWish.fav)
  //     .success(function (data) {
  //       console.log(data);
  //     });
  // }
}