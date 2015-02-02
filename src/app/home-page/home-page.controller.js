(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['$log', 'dataservice', '_'];

  function HomePage($log, dataservice, _) {
    var vm = this;
    vm.title = _.trim('__Home page__');   // example of vendor library usage

    activate();

    function activate() {
      dataservice.getSomething()
        .then(function() {
          $log.info('Call will throw an error with 100% probability and you won\'t see this message');
        })
        .finally(function() {
          $log.log('Home page activated')
        });
    }
  }
})();