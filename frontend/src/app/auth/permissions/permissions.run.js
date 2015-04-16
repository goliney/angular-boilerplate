(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(permissionsRun);

  permissionsRun.$inject = ['$rootScope', '$state', 'Permissions'];

  function permissionsRun ($rootScope, $state, Permissions) {
    $rootScope.$on('$stateChangeStart', function (e, toState) {
      if (!Permissions.hasAccessToState(toState)) {
        e.preventDefault();
        Permissions.accessDeniedHandler();
      }
      // save `toState` for check access to route
      // after user`s permissions resolution
      $rootScope.toState = toState;
    });
  }

})();