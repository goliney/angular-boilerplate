(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthSigninController', AuthSigninController);

  AuthSigninController.$inject = ['$state', 'AuthService'];

  function AuthSigninController($state, AuthService) {
    var vm = this;

    vm.signIn = signIn;
    vm.login = {
      username: '',
      password: ''
    };

    activate();

    function activate() {
      console.log('AuthSigninController activated');
    }

    function signIn() {
      AuthService.login(vm.login)
        .then(function (r) {
          $state.go('app.home');
        })
        .catch(function (error) {
          // TODO: show error message
        });
    }
  }
})();