(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$log'];

  function dataservice($http, $log) {
    var service = {
      getSomething: getSomething
    };

    return service;
    /////////////////

    function getSomething() {
      return $http.get('/api/something')
        .then(getSomethingComplete)
        .catch(getSomethingFailed);

      function getSomethingComplete(response) {
        return response.data.results;
      }

      function getSomethingFailed(error) {
        $log.error('XHR Failed for getSomething.' + error.data);
      }
    }
  }

})();