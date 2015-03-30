(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = ['_'];

  function HomePage(_) {
    var vm = this;
    vm.title = 'Home page';

    activate();

    function activate() {
      var randomId = _.random(10);        // example of vendor library usage
    }
  }
})();