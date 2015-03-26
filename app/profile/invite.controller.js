angular
  .module('ps')
  .controller('InviteController', InviteController);

function InviteController($http, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.users = {};
  vm.currentFriends = [];
  getPossibleFriends();

  function getPossibleFriends () {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
      .success(function (data){
        console.log('vm.friends', data)
        vm.friends = data;
        Object.keys(data).forEach(function (key) {
          friendPop(key, data[key].uid);
          vm.currentFriends.push(data[key].uid);
        });
      $http
        .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/possibleFriends.json')
        .success(function (data){
          vm.possibleFriends = Object.keys(data);
          // for(i = 0; i < vm.currentFriends.length; i++){
          //   delete vm.possibleFriends[i];
          // };
          for(i = 0; i < vm.currentFriends.length; i++){
            $http
              .delete('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/possibleFriends/' + vm.possibleFriends[i] + '.json')
              .success(function (data){
              })
          };
        })
        .then(function (){
          $http
            .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/possibleFriends.json')
            .success(function (data){
              vm.users=data;
            })
        })
      });
  }

  vm.addFriend = function (id) {
    $http
      .post('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json', {uid: id})
      .success(function (data) {
        vm.friend = data;
      })
  }

  vm.logout =   function () {
    authFactory.logout(function () {
      delete $rootScope.user;
      $location.path('/');
      $scope.$apply();
    });
  };

  function friendPop(uuid, uid) {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '.json')
      .success(function (data){
        data.uid = uid;
        vm.friends[uuid] = data;
      });
  }
}