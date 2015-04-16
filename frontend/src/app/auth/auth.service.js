(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$q', '$state', '$http', 'API_ROOT', 'localStorageService', 'User'];

  function AuthService($q, $state, $http, API_ROOT, storage, User) {
    var user;
    var service = {
      login: login,
      logout: logout,
      getToken: getToken,
      removeToken: removeToken,
      isTokenExpired: isTokenExpired,
      redirectToSignin: redirectToSignin,
      getCurrentUser: getCurrentUser
    };

    return service;

    //////////

    function login(credentials) {
      return $http.post(API_ROOT + 'session/create', credentials)
      //return $http.post('/static/assets/mock/token.json', credentials)
        .then(loginSuccess)
        .catch(loginError);

      function loginSuccess(response) {
        storage.set('token', response.data);
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
      return token ? token.token : null;
    }

    function removeToken() {
      storage.remove('token');
    }

    function redirectToSignin() {
      $state.go('public.signin');
    }

    function isTokenExpired(token) {
      var now = new Date();
      var tokenExpire = new Date(token.expire);
      return now > tokenExpire;
    }

    function getCurrentUser() {
      if (!user) {
        user = User.getCurrent();
      }
      return user;
    }
  }
})();