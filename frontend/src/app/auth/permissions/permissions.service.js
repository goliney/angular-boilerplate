(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('Permissions', Permissions);

  Permissions.$inject = ['$rootScope', 'AuthService', '_'];

  function Permissions($rootScope, AuthService, _) {
    var user;
    var service = {
      hasAccessToState: hasAccessToState,
      hasPermission: hasPermission,
      getCurrentUser: getCurrentUser,
      accessDeniedHandler: accessDeniedHandler
    };

    return service;

    //////////

    /**
     * Returns false if access should be denied.
     */
    function hasAccessToState(state) {
      if (state.data && state.data.hasPermission && !service.hasPermission(state.data.hasPermission)) {
        return false;
      }
      return true;
    }

    /**
     * Check if the user has permission
     */
    function hasPermission(permissions) {
      var currentUser = getCurrentUser();

      // If current user will not be resolved - access denied
      if (!currentUser) {
        return false;
      }

      // If current user is not resolved yet - access allowed
      // (used in stateChange case)
      if (!currentUser.$resolved) {
        return true;
      }

      if (!currentUser.permissions) {
        return false;
      }

      if (!angular.isArray(permissions)) {
        permissions = [permissions];
      }

      for (var i = 0; i < permissions.length; ++i) {
        if (_.indexOf(currentUser.permissions, permissions[i]) == -1) {
          return false;
        }
      }

      return true;
    }

    function getCurrentUser() {
      if (!user) {
        user = AuthService.getCurrentUser();
        if (user) {
          user.$promise.then(function(userObject) {
            // check access to current state
            // we cannot use $scope.$current as it is empty on page refresh
            if (!hasAccessToState($rootScope.toState)) {
              accessDeniedHandler();
            }
            return userObject;
          });
        }
      }
      return user;
    }

    function accessDeniedHandler() {
      AuthService.redirectToSignin($rootScope.toState, $rootScope.toStateParams);
    }
  }
})();