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
        $http
          .get('https://presently-surprised.firebaseio.com/users.json')
          .success(function (data){
            console.log(data);
            $http
              .put('https://presently-surprised.firebaseio.com/users/' + authData.uid + '/possibleFriends.json', data)
              .success(function (data){
                console.log('possible friends', data);
              })
          })
        // location.reload(true);
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
        vm.user.birthdayTime = new Date(vm.user.birthday);
        vm.user.uid = authData.uid;
        $http
          .put('https://presently-surprised.firebaseio.com/users/' + authData.uid + '/profile.json', vm.user)
          .success(function (data) {
            vm.user = data;
          });
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