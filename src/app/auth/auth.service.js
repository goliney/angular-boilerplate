(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$q', '$state', '$http', 'localStorageService', 'API_ROOT'];

  function AuthService($q, $state, $http, storage, API_ROOT) {
    var service = {
      login: login,
      logout: logout,
      getToken: getToken,
      removeToken: removeToken,
      isTokenExpired: isTokenExpired,
      redirectToSignin: redirectToSignin
    };

    return service;

    //////////

    function login(credentials) {
      return $http.post('assets/mock/token.json', credentials)
        .then(loginSuccess)
        .catch(loginError);

      function loginSuccess(response) {
        storage.set('token', response.data.token);
        return response;
      }
      function loginError(response) {
        return $q.reject(response);
      }
    }

    function logout() {
      removeToken();
      redirectToSignin();
    }

    function getToken() {
      var token = storage.get('token');
      // return only if not expired
      if (token && isTokenExpired(token)) {
        removeToken();
        token = null;
      }
      return token;
    }

    function removeToken() {
      storage.remove('token');
    }

    function redirectToSignin() {
      $state.go('public.signin');
    }

    function isTokenExpired(token) {
      return false;
    }
  }
})();