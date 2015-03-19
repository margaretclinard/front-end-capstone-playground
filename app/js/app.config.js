angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/login.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/register', {
        templateUrl: 'app/register.html',
        controller: 'UserController',
        controllerAs: 'user'
      })
      .when('/home', {
        templateUrl: 'app/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/birthdays', {
        templateUrl: 'app/birthdays.html',
        controller: 'BdayController',
        controllerAs: 'bday'
      })
      .when('/wishlist', {
        templateUrl: 'app/wishlist.html',
        controller: 'WishController',
        controllerAs: 'wish'
      })
      .when('/invite', {
        templateUrl: 'app/invite.html'
      })
      .when('/profile', {
        templateUrl: 'app/profile.html'
      })
  })