angular
  .module('ps')
  .controller('AuthController', AuthController)

function AuthController($rootScope, $http, $scope, $location, authFactory) {
  var vm = this;

  vm.user = {};

  $( "#datepicker" ).datepicker({
    changeMonth: true,
    showButtonPanel: true,
    dateFormat: 'MM d'
  });

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
        monthNumber();
        delete vm.user['password'];
        // vm.user.birthday = new Date(vm.birthday)
        $http
          .put('https://presently-surprised.firebaseio.com/users/' + authData.uid + '/profile.json', vm.user)
          .success(function (data) {
            vm.user = data;
          });
      }
    });
  };

  function monthNumber () {
    if (vm.user.birthday.substring(0,3) === 'Jan') {
      vm.user.bdayMonth = 1;
    } else if (vm.user.birthday.substring(0, 3) === 'Feb') {
      vm.user.bdayMonth = 2;
    } else if (vm.user.birthday.substring(0, 3) === 'Mar') {
      vm.user.bdayMonth = 3;
    } else if (vm.user.birthday.substring(0, 3) === 'Apr') {
      vm.user.bdayMonth = 4;
    } else if (vm.user.birthday.substring(0, 3) === 'May') {
      vm.user.bdayMonth = 5;
    } else if (vm.user.birthday.substring(0, 3) === 'Jun') {
      vm.user.bdayMonth = 6;
    } else if (vm.user.birthday.substring(0, 3) === 'Jul') {
      vm.user.bdayMonth = 7;
    } else if (vm.user.birthday.substring(0, 3) === 'Aug') {
      vm.user.bdayMonth = 8;
    } else if (vm.user.birthday.substring(0, 3) === 'Sep') {
      vm.user.bdayMonth = 9;
    } else if (vm.user.birthday.substring(0, 3) === 'Oct') {
      vm.user.bdayMonth = 10;
    } else if (vm.user.birthday.substring(0, 3) === 'Nov') {
      vm.user.bdayMonth = 11;
    } else if (vm.user.birthday.substring(0, 3) === 'Dec') {
      vm.user.bdayMonth = 12;
    };
  }

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