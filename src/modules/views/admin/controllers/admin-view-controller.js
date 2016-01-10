'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewController', adminViewController);

  adminViewController.$inject = ['$log', '$state', '$modal', 'AuthenticationFactory', 'PubSubFactory', 'usSpinnerService'];

  function adminViewController($log, $state, $modal, AuthenticationFactory, PubSubFactory, usSpinnerService) {
    /*jshint validthis:true */
    var vm = this;

    vm.isAuthenticated = false;
    vm.credentials = {
      username: '',
      password: ''
    };

    vm.login = function () {
      usSpinnerService.spin('spinner-1');

      var creds = vm.credentials;

      AuthenticationFactory.login(creds.username, creds.password).then(function() {
        usSpinnerService.stop('spinner-1');
        vm.isAuthenticated = true;
        $state.go('admin.events');
      }, function () {
        usSpinnerService.stop('spinner-1');
        showModal('Invalid Credentials', 'Your username or password are incorrect.  Please try again.');
      });
    };

    vm.logout = function () {
      AuthenticationFactory.logout();
      vm.isAuthenticated = false;  //XXX TODO use return value from logout
    };

    vm.init = function() {
      $log.info('ENTER as.views.admin');
      usSpinnerService.stop('spinner-1');

      vm.isAuthenticated = AuthenticationFactory.isAuthenticated();

      if (!vm.isAuthenticated) {
        vm.logout();
      }
    };

    function showModal(heading, body) {
      modalInstanceController.$inject = ['$scope', '$modalInstance'];

      function modalInstanceController($scope, $modalInstance) {
        $scope.heading = heading;
        $scope.body = body;

        $scope.ok = function () {
          $modalInstance.close();
        };
      }

      $modal.open({
        animation: true,
        templateUrl: '/views/admin/templates/admin-view-modal.html',
        controller: modalInstanceController
      });
    }

    PubSubFactory.subscribe('RESPONSE_UNAUTH', function() {
      vm.logout();
      showModal('Session Expired', 'Your session has expired.  Please login again.');
    });

    PubSubFactory.subscribe('RESPONSE_BAD_PARAMS', function(response) {
      if (response.config.url === '/api/login') {
        vm.logout();
        usSpinnerService.stop('spinner-1');
        showModal('Invalid Credentials', 'Your username or password is incorrect.  Please try again.');
      }
    });

    vm.init();

  }
}(angular));