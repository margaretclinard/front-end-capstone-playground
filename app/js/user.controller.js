angular
  .module('ps')
  .controller('UserController', UserController);

function UserController ($http) {
  var vm = this;

  vm.email = "";
  vm.name = "";
  vm.street = "";
  vm.city = "";
  vm.birthday = "";

  // vm.login = function () {
  //   $http
  //     .post(BASE_URL + '/users.json')
  //     .success(function (res) {
  //       cb(res);
  //     });
  // }
};