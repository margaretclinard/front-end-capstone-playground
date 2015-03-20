angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/profile/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/birthdays', {
        templateUrl: 'app/birthdays/bdays.html',
        controller: 'BdayController',
        controllerAs: 'bday'
      })
      .when('/wishlist', {
        templateUrl: 'app/profile/wishlist.html',
        controller: 'WishController',
        controllerAs: 'wish'
      })
      .when('/invite', {
        templateUrl: 'app/profile/invite.html'
      })
      .when('/profile', {
        templateUrl: 'app/profile/profile.html'
      })
  })