(function() {
  function RegisterCtrl($scope) {
    $scope.login = function() {
      $scope.mess = 'Welcome ' + $scope.user.email;
    };
    $scope.register = function() {
      $scope.message = 'Welcome ' + $scope.user.firstname;
    };

  }

  angular
    .module("blocJams")
    .controller('RegisterCtrl', ['$scope', RegisterCtrl]);
})();
