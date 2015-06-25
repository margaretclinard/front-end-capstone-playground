angular
  .module('ps')
  .controller('HomeController', HomeController);

function HomeController ($http, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.user = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/profile.json')
    .success(function (data){
      vm.user = data;
    });

  vm.logout =   function () {
    authFactory.logout(function () {
      delete $rootScope.user;
      $location.path('/');
      $scope.$apply();
    });
  };
}