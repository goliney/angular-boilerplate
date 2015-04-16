(function() {
  'use strict';

  angular
    .module('app.auth')
    .constant('authEvents', {
      BAD_REQUEST: 'bad_request',       // 400
      UNAUTHORIZED: 'unauthorized',     // 401
      FORBIDDEN: 'forbidden'            // 403
    });

})();