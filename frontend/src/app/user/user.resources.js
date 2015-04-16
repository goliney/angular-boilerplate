(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('User', UserResource);

  UserResource.$inject = ['$resource', 'API_ROOT'];

  function UserResource($resource, API_ROOT) {
    var User = $resource(API_ROOT + 'users/:_id', {}, {
      getCurrent: {
        url: '/static/assets/mock/user.json',
        cache: true
      },
      update: {
        method: 'PUT'
      }
    });
    return User;
  }
})();
