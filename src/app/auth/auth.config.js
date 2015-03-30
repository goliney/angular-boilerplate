(function () {
  'use strict';

  angular
    .module('app.auth')
    .config(authConfig);

  authConfig.$inject = ['$httpProvider'];

  function authConfig($httpProvider) {
    // add header with token on every request
    $httpProvider.interceptors.push('AuthInterceptor');
  }
})();