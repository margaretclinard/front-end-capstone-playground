angular
  .module('ps')
  .controller('InviteController', InviteController);

function InviteController($http, $rootScope, $scope, $location, authFactory) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.users = {};
  vm.currentFriends = [];


  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/possibleFriends.json')
    .success(function (data){
      vm.possibleFriends = Object.keys(data);
      $http
        .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
        .success(function (data){
          vm.friends = data;
          Object.keys(data).forEach(function (key) {
            friendPop(key, data[key].uid);
            vm.currentFriends.push(data[key].uid);
          });
          for(i = 0; i < vm.currentFriends.length; i++){
            // console.log(vm.possibleFriends);
            delete vm.possibleFriends[i];
            // console.log(vm.possibleFriends)
          };
        })
        .then(function (res){
          console.log(res);
        })
    });

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

  // //DISPLAY ONLY PEOPLE WHO ARE NOT YOUR FRIEND
//   $http
//     .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
//     .success(function (data){
//       vm.friends = data;
//     })
//     .then(function (res) {
//       // console.log(res.data);
//       vm.friendsArr = [];
//       Object.keys(res.data).forEach(function (key) {
//         friendPop(key, res.data[key].uid)
//         // vm.myFriends.push(res.data[key].uid);
//         // console.log(vm.myFriends);
//       });
//       vm.friendsArr.push(vm.myFriends);
//     });

  function friendPop(uuid, uid) {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '.json')
      .success(function (data){
        data.uid = uid;
        vm.friends[uuid] = data;
      });
  }
}