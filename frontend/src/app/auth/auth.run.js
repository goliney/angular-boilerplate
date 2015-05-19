(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(authRun);

  authRun.$inject = ['$rootScope', '_', '$state', 'AuthService'];

  function authRun ($rootScope, _, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function (e, toState, toStateParams) {
      // check auth token availability on every route change
      // do not check if route state is public
      if (_.startsWith(toState.name, 'public') === false) {
        if (!AuthService.getToken()) {
          e.preventDefault();
          AuthService.redirectToSignin(toState, toStateParams);
        }
      }
    });
  }

})();