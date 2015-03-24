angular
  .module('ps')
  .controller('BdayController', BdayController);

function BdayController ($rootScope, $scope, $location, authFactory) {
  var vm = this;

  vm.data = [{
    name: 'Jane Doe',
    address: 'Nashville, TN',
    birthday: '3/26/1988'
  },
  {
    name: 'John Smith',
    address: 'Nashville, TN',
    birthday: '3/5/1990'
  }];

  vm.logout =   function () {
    authFactory.logout(function () {
      delete $rootScope.user;
      $location.path('/');
      $scope.$apply();
    });
  };
}