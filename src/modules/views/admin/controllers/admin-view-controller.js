'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewController', adminViewController);

  adminViewController.$inject = ['$log', '$state', 'AuthenticationFactory', 'PubSubFactory'];

  function adminViewController($log, $state, AuthenticationFactory, PubSubFactory) {
    $log.info('ENTER as.views.admin');
    /*jshint validthis:true */
    var vm = this;

    vm.credentials = {
      username: '',
      password: ''
    };

    vm.isAuthenticated = AuthenticationFactory.isAuthenticated();

    vm.login = function () {
      var creds = vm.credentials;

      AuthenticationFactory.login(creds.username, creds.password).then(function() {
        vm.isAuthenticated = true;
        $state.go('admin.events');
      }, function () {
        $log.error('login failure');
      });
    };

    vm.logout = function () {
      AuthenticationFactory.logout();
      //XXX TODO use return value from logout
      vm.isAuthenticated = false;
    };

    PubSubFactory.subscribe('RESPONSE_UNAUTH', function() {
      $log.warn('session expired');
      vm.logout();
    });

  }

}(angular));