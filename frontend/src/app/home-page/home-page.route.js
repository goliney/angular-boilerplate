(function() {
  'use strict';

  angular
    .module('app.home-page')
    .config(appConfig);

  appConfig.$inject = ['$stateProvider'];

  function appConfig($stateProvider) {
    $stateProvider
      .state('app.home', {
        url: '/',
        views: {
          'main@' : {
            templateUrl: 'home-page/home-page.tpl.html',
            controller: 'HomePageController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();