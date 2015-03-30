(function () {
  'use strict';

  angular
    .module('app.core')
    .config(coreConfig);

  coreConfig.$inject = ['$httpProvider', 'localStorageServiceProvider'];

  function coreConfig($httpProvider, localStorageServiceProvider) {
    // enable http caching
    $httpProvider.defaults.cache = true;

    // Store values with prefix
    localStorageServiceProvider.setPrefix('myAppPrefix');
  }
})();