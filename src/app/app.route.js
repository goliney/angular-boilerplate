(function() {
  'use strict';

  angular
    .module('app.home-page')
    .config(appConfig);

  appConfig.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

  function appConfig($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('app', {
        url: '',
        abstract: true
      });

    $urlRouterProvider.otherwise('/');

  }
})();
