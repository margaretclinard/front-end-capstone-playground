angular
  .module('ps')
  .controller('HomeController', HomeController);

function HomeController () {
  var vm = this;

  var currentDate = new Date();
  var month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  vm.month = month[currentDate.getMonth()];
}