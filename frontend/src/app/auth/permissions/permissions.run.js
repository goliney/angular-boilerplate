(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(permissionsRun);

  permissionsRun.$inject = ['$rootScope', '$state', 'Permissions'];

  function permissionsRun ($rootScope, $state, Permissions) {
    $rootScope.$on('$stateChangeStart', function (e, toState, toStateParams) {
      // save `toState` for check access to route after user`s permissions resolution
      // and for redirect after successful sign in
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;

      if (!Permissions.hasAccessToState(toState)) {
        e.preventDefault();
        Permissions.accessDeniedHandler();
      }
    });
  }

})();