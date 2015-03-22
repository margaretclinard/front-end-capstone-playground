angular
  .module('ps')
  .controller('ProfileController', ProfileController)

function ProfileController ($http) {
  var vm = this;
  var fb = new Firebase('https://presently-surprised.firebaseio.com/');

  vm.user = {};

  $http
    .get('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/profile.json')
    .success(function (data){
      vm.user = data;
    })

  vm.update = function (id) {
    $http
      .patch('https://presently-surprised.firebaseio.com/users/' + fb.getAuth().uid + '/profile.json', vm.user)
      .success(function (res){
        vm.user = res;
      })
    $('#editModal').modal('hide')
  }
}