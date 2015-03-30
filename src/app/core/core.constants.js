(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('_', _)                                     // lodash
    .constant('API_ROOT', 'http://localhost:3001/');      // api root url
})();