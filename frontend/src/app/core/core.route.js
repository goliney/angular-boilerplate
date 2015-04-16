(function() {
  'use strict';

  angular
    .module('app.core')
    .config(coreConfig);

  coreConfig.$inject = ['$locationProvider', '$urlRouterProvider', '$stateProvider'];

  function coreConfig($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        resolve: {
          CurrentUser: ['User', function(User) {
            return User.getCurrent().$promise;
          }]
        }
      })
      .state('public', {
        url: '',
        abstract: true,
        resolve: {
          CurrentUser: function() {
            return null;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }
})();