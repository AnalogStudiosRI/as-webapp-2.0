'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewController', adminViewController);

  adminViewController.$inject = ['$log', '$state', 'AuthenticationFactory'];

  function adminViewController($log, $state, AuthenticationFactory) {
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
        $log.debug('failure');
      });
    };

    vm.logout = function () {
      AuthenticationFactory.logout();
      //XXX TODO use return value from logout
      vm.isAuthenticated = false;
    };
  }

}(angular));