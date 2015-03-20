angular
  .module('ps')
  .factory('authFactory', authFactory)

function authFactory() {
  return {
    isLoggedIn: function (){
      var fb = new Firebase('https://presently-surprised.firebaseio.com');

      return !!fb.getAuth();
    },

    getAuth: function () {
      var fb = new Firebase('https://presently-surprised.firebaseio.com');

      return fb.getAuth();
    },

    login: function (user, cb) {
      var fb = new Firebase('https://presently-surprised.firebaseio.com');

      fb.authWithPassword(user, cb);
    },

    logout: function (cb) {
      var fb = new Firebase('https://presently-surprised.firebaseio.com');

      fb.unauth(cb);
    },

    register: function (user, cb) {
      var fb = new Firebase('https://presently-surprised.firebaseio.com');

      fb.createUser(user, cb);
    },

    forgotPassword: function (user, cb) {
      var fb = new Firebase('https://presently-surprised.firebaseio.com');

      fb.resetPassword(user, cb);
    }
  };
}