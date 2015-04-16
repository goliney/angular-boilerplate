(function() {
  'use strict';

  angular
    .module('app.home-page')
    .controller('ArticlesController', Articles);

  Articles.$inject = [];

  function Articles() {
    var vm = this;
    vm.user = {};

    activate();

    function activate() {
       console.log('ArticlesController activated');
    }
  }
})();