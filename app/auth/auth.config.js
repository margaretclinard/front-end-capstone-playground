angular
  .module ('ps')
  .config(authConfig)
  .run(privateRoutes);


function authConfig($routeProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      resolve: {
        data: function ($location, authFactory) {
          if (authFactory.isLoggedIn()) {
            $location.path('/home')
          }
        }
      }
    })
    .when('/register', {
      templateUrl: 'app/auth/register.html',
      controller: 'AuthController',
      controllerAs: 'auth',
      resolve: {
        data: function ($location, authFactory) {
          if (authFactory.isLoggedIn()) {
            $location.path('/home')
          }
        }
      }
    })
  }

function privateRoutes($rootScope, $location, authFactory, $http) {
  $rootScope.$on('$routeChangeStart', function (event, nextRoute) {

    $rootScope.user = authFactory.getAuth();

    $http
      .get('https://presently-surprised.firebaseio.com/users.json')
      .success(function (data){
        $rootScope.user.allUsers = data;
        $rootScope.user.currentFriends  = _.map(_.values(data[$rootScope.user.uid].friends), function(obj) {
          return obj.uid;
        })
        $rootScope.user.possibleFriends = _.omit($rootScope.user.allUsers, $rootScope.user.currentFriends);
      })

    if (loginRequired()) {
      $location.path('/login');
    }

    function loginRequired() {
      return nextRoute.$$route && nextRoute.$$route.private && !authFactory.isLoggedIn();
    }

  });
}