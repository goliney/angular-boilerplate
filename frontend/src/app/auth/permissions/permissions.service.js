(function () {
  'use strict';

  angular
    .module('app.auth')
    .factory('Permissions', Permissions);

  Permissions.$inject = ['$rootScope', '$state', 'AuthService', '_'];

  function Permissions($rootScope, $state, AuthService, _) {
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
     * If current user is not resolved - access allowed
     */
    function hasPermission(permissions) {
      var currentUser = getCurrentUser();

      if (!currentUser.$resolved) {
        return true;
      }

      if (!currentUser.permissions || !permissions) {
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
        user.$promise.then(function(userObject) {
          // check access to current state
          // we cannot user $scope.$current as it is empty on page refresh
          if (!hasAccessToState($rootScope.toState)) {
            accessDeniedHandler();
          }
          return userObject;
        });
      }
      return user;
    }

    function accessDeniedHandler() {
      $state.go('public.signin');
    }
  }
})();