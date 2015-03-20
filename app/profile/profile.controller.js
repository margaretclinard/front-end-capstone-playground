angular
  .module('ps')
  .controller('ProfileController', ProfileController)

function ProfileController ($http) {
  $http
    .get('')
    .success(function (data){
      console.log(data);
    })
}