(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('AuthService', AuthService);

  AuthService.$inject = ['$q', '$state', '$http', 'API_ROOT', 'localStorageService', 'User'];

  function AuthService($q, $state, $http, API_ROOT, storage, User) {
    var user;
    var returnToState;
    var returnToStateParams;
    var service = {
      login: login,
      logout: logout,
      getToken: getToken,
      removeToken: removeToken,
      isTokenExpired: isTokenExpired,
      redirectToSignin: redirectToSignin,
      redirectFromSignin: redirectFromSignin,
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
      user = null;
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

    function redirectToSignin(fromState, fromStateParams) {
      returnToState = fromState;
      returnToStateParams = fromStateParams;
      $state.go('public.signin');
    }

    /**
     * Redirect to stored state after successful sign in
     */
    function redirectFromSignin() {
      if (returnToState != null && returnToStateParams != null) {
        $state.go(returnToState, returnToStateParams);
        returnToState = null;
        returnToStateParams = null;
      } else {
        $state.go('app.home');
      }
    }

    function isTokenExpired(token) {
      var now = new Date();
      var tokenExpire = new Date(token.expire);
      return now > tokenExpire;
    }

    function getCurrentUser() {
      var token = getToken();
      if (!user && token) {
        user = User.getCurrent();
      }
      return user;
    }
  }
})();