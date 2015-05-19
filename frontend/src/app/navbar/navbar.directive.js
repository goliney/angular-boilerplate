(function() {
  'use strict';

  angular
    .module('app.navbar')
    .directive('navbar', NavbarDirective);

  NavbarDirective.$inject = ['AuthService'];

  function NavbarDirective(AuthService) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'navbar/navbar.tpl.html',
      controller: ['$scope', function($scope){
        $scope.user = AuthService.getCurrentUser();

        $scope.signout = function() {
          AuthService.logout();
          $scope.user = null;
        };
      }]
    };
  }
})();