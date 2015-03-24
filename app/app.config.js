angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/landing.html'
      })
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
        templateUrl: 'app/profile/invite.html',
        controller: 'InviteController',
        controllerAs: 'invite'
      })
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
      })
      .when('', {
        templateUrl: 'app/layout/header.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .when('/about', {
        templateUrl: 'app/layout/about.html'
      })
      .when('/friends', {
        templateUrl: 'app/friends/friendlist.html',
        controller: 'FriendController',
        controllerAs: 'friend'
      })
  })