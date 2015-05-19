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
          AuthService.redirectFromSignin();
        })
        .catch(function (error) {
          // TODO: show error message
        });
    }
  }
})();