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
      console.log(data);
    });

  vm.submit = function () {
    $http
      .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/wishlist.json', vm.newWish)
      .success(function (data) {
        console.log(data.name);
        // $location.path('/');
      });

    vm.newWish= {};
  }
}