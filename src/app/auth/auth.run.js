(function() {
  'use strict';

  angular
    .module('app.auth')
    .run(authRun);

  authRun.$inject = ['$rootScope', '_', '$state', 'AuthService'];

  function authRun ($rootScope, _, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', function (e, to) {
      // check auth token availability on every route change
      // do not check if route state is public
      if (_.startsWith(to.name, 'public') === false) {
        if (!AuthService.getToken()) {
          e.preventDefault();
          $state.go('public.signin');
        }
      }
    });
  }

})();