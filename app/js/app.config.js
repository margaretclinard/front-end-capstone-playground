angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/home', {
        templateUrl: 'app/home.html'
      })
      .when('/birthdays', {
        templateUrl: 'app/birthdays.html'
      })
      .when('/wishlist', {
        templateUrl: 'app/wishlist.html'
      })
      .when('/invite', {
        templateUrl: 'app/invite.html'
      })
      .when('/profile', {
        templateUrl: 'app/profile.html'
      })
  })