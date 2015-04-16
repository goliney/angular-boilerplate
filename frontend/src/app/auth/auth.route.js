(function() {
  'use strict';

  angular
    .module('app.auth')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('public.signin', {
        url: '/signin',
        views: {
          'main@' : {
            templateUrl: 'auth/signin/signin.tpl.html',
            controller: 'AuthSigninController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();