(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('HomePageController', HomePage);

  HomePage.$inject = [];

  function HomePage() {
    var vm = this;

    activate();

    function activate() {
      console.log('HomePageController activated');
    }
  }
})();