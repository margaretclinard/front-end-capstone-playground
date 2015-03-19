angular
  .module('ps')
  .controller('WishController', WishController)

function WishController ($http) {
  var vm = this;

  vm.newWish = {};

  vm.submit = function () {
    $http
      .post('https://presently-surprised.firebaseio.com/wishlist.json', vm.newWish)
      .success(function (data) {
        console.log(data);
        // $location.path('/');
      });

    vm.newWish= {};
  }

  $http
    .get('https://presently-surprised.firebaseio.com/wishlist.json')
    .success(function (data) {
      console.log(data);
    });
}