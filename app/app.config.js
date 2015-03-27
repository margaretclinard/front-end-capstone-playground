angular
  .module ('ps')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/landing.html',
        controller: 'AuthController',
        controllerAs: 'auth'
      })
      .when('/home', {
        templateUrl: 'app/profile/home.html',
        controller: 'HomeController',
        controllerAs: 'home',
        private: true
      })
      .when('/birthdays', {
        templateUrl: 'app/birthdays/bdays.html',
        controller: 'BdayController',
        controllerAs: 'bday',
        private: true
      })
      .when('/wishlist', {
        templateUrl: 'app/profile/wishlist.html',
        controller: 'WishController',
        controllerAs: 'wish',
        private: true
      })
      .when('/invite', {
        templateUrl: 'app/profile/invite.html',
        controller: 'InviteController',
        controllerAs: 'invite',
        private: true
      })
      .when('/profile', {
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        private: true
      })
      .when('', {
        templateUrl: 'app/layout/header.html',
        controller: 'AuthController',
        controllerAs: 'auth',
        private: true
      })
      .when('/about', {
        templateUrl: 'app/layout/about.html',
        private: true
      })
      .when('/friends', {
        templateUrl: 'app/friends/friendlist.html',
        controller: 'FriendController',
        controllerAs: 'friend',
        private: true
      })
      .otherwise({
        redirectTo: '/home'
      });
  })