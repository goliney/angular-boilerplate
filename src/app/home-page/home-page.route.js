(function() {
  'use strict';

  angular
    .module('app.home-page')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  /**
    Info about routing, nested states and more:
    https://github.com/angular-ui/ui-router
   */

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.home-page', {
        url: '',
        templateUrl: '/home-page.html',
        controller: 'HomePageController',
        controllerAs: 'vm'
      });
  }
})();