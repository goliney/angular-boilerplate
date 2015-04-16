(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['$q', '$rootScope', '$injector', '$templateCache', 'authEvents'];

  function AuthInterceptor($q, $rootScope, $injector, $templateCache, authEvents) {
    var AuthService;
    var authHeader = 'Authorization';

    var interceptor = {
      request: requestFn,
      responseError: responseErrorFn
    };

    return interceptor;

    //////////

    function requestFn(request) {
      if (request.skipAuthorization) {
        return request;
      }

      if ($templateCache.get(request.url) !== undefined) {
        return request;
      }

      request.headers = request.headers || {};

      // Already has an Authorization header
      if (request.headers[authHeader]) {
        return request;
      }

      var token = getToken();

      if (token) {
        request.headers[authHeader] = token;
      }

      return request;
    }

    function responseErrorFn(response) {
      // handle the case where the were errors in request
      if (response.status === 400) {
        $rootScope.$broadcast(authEvents.BAD_REQUEST, response);
      }
      // handle the case where the user is not authenticated
      if (response.status === 401) {
        $rootScope.$broadcast(authEvents.UNAUTHORIZED, response);
        handleUnauthorized();
      }
      // handle the case where the access is forbidden
      if (response.status === 403) {
        $rootScope.$broadcast(authEvents.FORBIDDEN, response);
      }
      return $q.reject(response);
    }

    function injectAuthService() {
      // Injected manually to get around circular dependency problem.
      // See: http://stackoverflow.com/questions/20647483/angularjs-injecting-service-into-a-http-interceptor-circular-dependency
      // See: https://github.com/angular/angular.js/issues/2367
      AuthService = AuthService || $injector.get('AuthService');
    }

    function getToken() {
      injectAuthService();
      var token = AuthService.getToken();
      return token;
    }

    function handleUnauthorized() {
      injectAuthService();
      //TODO: proper action on 401. Show modal login form or smth.
      AuthService.logout();
    }
  }

})();