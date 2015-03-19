angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
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