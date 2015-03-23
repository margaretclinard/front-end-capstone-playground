angular
  .module('ps')
  .controller('FriendController', FriendController)

function FriendController ($http) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.friends = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/friends.json')
    .success(function (data){
      vm.friends = data;
    })
    .then(function (res) {
      console.log(res.data);
      Object.keys(res.data).forEach(function (key) {
        friendPop(key, res.data[key].uid)
      });
    });

  vm.getWishList = function (uid) {
    console.log('uid', uid);

    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '/wishlist.json')
      .success(function (data) {
        console.log(data);
      })
  };

  function friendPop(uuid, uid) {
    $http
      .get('https://presently-surprised.firebaseio.com/users/' + uid + '.json')
      .success(function (data){
        console.log('friends', data);
        data.uid = uid;
        vm.friends[uuid] = data;
      });
  }

}