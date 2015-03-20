angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/auth/login.html',
        controller: 'AuthController',
        controllerAs: 'auth',
        // resolve: {
        //   data: function ($location, authFactory) {
        //     if (authFactory.isLoggedIn()) {
        //       $location.path('/home')
        //     }
        //   }
        // }
      })
      .when('/register', {
        templateUrl: 'app/auth/register.html',
        controller: 'AuthController',
        controllerAs: 'auth',
        // resolve: {
        //   data: function ($location, authFactory) {
        //     if (authFactory.isLoggedIn()) {
        //       $location.path('/home')
        //     }
        //   }
        // }
      })
  })