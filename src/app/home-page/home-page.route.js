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
            templateUrl: 'src/app/home-page/home-page.html',
            controller: 'HomePageController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();