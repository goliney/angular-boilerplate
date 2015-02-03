(function () {
  'use strict';

  angular
    .module('app')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$q','$http', '$resource', '$log'];

  function dataservice($q, $http, $resource, $log) {
    var projectResource = $resource('/api/', {}, {
      getSomething: {
        method: 'GET',
        url: '/api/something/:projectId'
      }
    });

    var service = {
      getSomething: getSomething
    };

    return service;

    function getSomething(id) {
      return projectResource.getSomething({projectId: id}).$promise;
    }
  }
})();