(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('_', _)                                       // lodash
    .constant('API_ROOT', 'http://localhost:5000/');        // api root url
})();