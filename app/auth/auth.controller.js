angular
  .module('ps')
  .controller('AuthController', AuthController)

function AuthController($rootScope, $http, $scope, $location, authFactory) {
  var vm = this;

  vm.user = {};

  vm.login = function () {
    authFactory.login(vm.user, function (err, authData) {
      if (err) {
        console.log('Error logging in user:', err);
      } else {
        console.log('Logged in successfully', authData);
        $rootScope.user = authData;
        $location.path('/home');
        $scope.$apply();
        $('#loginModal').modal('hide');
        location.reload(true);
      }
    });
  };

  vm.register = function () {
    authFactory.register(vm.user, function (err, authData) {
      if (err && err.code === 'EMAIL_TAKEN') {
        console.log('Already a user:', err);
        vm.login();
      } else if (err) {
        console.log('Error creating user:', err)
      } else {
        console.log('User created successfully', authData);
        vm.login();
        delete vm.user['password'];
        $http
          .put('https://presently-surprised.firebaseio.com/users/' + authData.uid + '/profile.json', vm.user)
          .success(function (data) {
            vm.user = data;
          });
        // $http
        //   .post('https://presently-surprised.firebaseio.com/names/' + authData.uid + '/name.json', vm.user.lastName)
        //   .success(function (data) {
        //     vm.user.lastName = data;
        //   });
      }
    });
  };

  vm.forgotPassword = function () {
    authFactory.forgotPassword(vm.user, function (err) {
      if (err) {
        console.log('Error resetting password:', err)
      } else {
        console.log('Password reset email sent successfully');
      }
    });
  };

  vm.logout =   function () {
    authFactory.logout(function () {
      delete $rootScope.user;
      $location.path('/login');
      $scope.$apply();
    });
  };
}