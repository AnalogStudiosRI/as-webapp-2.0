'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewController', adminViewController);

  adminViewController.$inject = ['$log', '$state', '$modal', 'AuthenticationFactory', 'PubSubFactory'];

  function adminViewController($log, $state, $modal, AuthenticationFactory, PubSubFactory) {
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
      vm.isAuthenticated = false;  //XXX TODO use return value from logout
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

    PubSubFactory.subscribe('RESPONSE_BAD_REQUEST', function() {
      showModal('Invalid Credentials', 'Your username or password are incorrect.  Please try again');
    });

    PubSubFactory.subscribe('RESPONSE_UNAUTH', function() {
      vm.logout();
      showModal('Session Expried', 'Your session has expired.  Please login again');
    });

  }

}(angular));