angular
  .module('ps')
  .controller('WishController', WishController)

function WishController ($http) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.newWish = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json')
    .success(function (data){
      vm.newWish = data;
    });

  vm.submit = function () {
    $http
      .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json', vm.newWish)
      .success(function (data) {
        $http
          .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json')
          .success(function (data){
            vm.newWish = data;
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
            vm.newWish = data;
          });
      });
  }

  // vm.fav = function (uuid) {
  //   vm.newWish.fav = {'favorite': true };

  //   $http
  //     .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist/' + uuid + '.json', vm.newWish.fav)
  //     .success(function (data) {
  //       console.log(data);
  //     });
  // }
}