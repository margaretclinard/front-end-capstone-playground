angular
  .module('ps')
  .controller('FriendController', FriendController)

function FriendController ($http) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.users = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
    .success(function (data){
      vm.users = data;
      console.log(data)
    });
}