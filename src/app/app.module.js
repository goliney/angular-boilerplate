(function() {
  'use strict';

  angular.module('app', [
    'templates-app',
    'templates-common',
    'app.core',

    // features area
    'app.auth',
    'app.user',
    'app.home-page'
  ]);

})();