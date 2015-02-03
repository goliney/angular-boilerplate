(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['$log', 'dataservice', '_'];

  function HomePage($log, dataservice, _) {
    var vm = this;
    vm.title = 'Home page';

    activate();

    function activate() {
      var randomId = _.random(10);        // example of vendor library usage
      //dataservice.getSomething(randomId)
      //  .then(function () {
      //    $log.info('Call will throw an error with 100% probability');
      //  });
    }
  }
})();