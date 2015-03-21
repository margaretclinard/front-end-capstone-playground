angular
  .module('ps')
  .controller('InviteController', InviteController);

function InviteController($http) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.users = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users.json')
    .success(function (data){
      vm.users = data;
      console.log(data)
    });
}