'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewEventsController', adminViewEventsController);

  adminViewEventsController.$inject = ['$log', '$modal', 'EventsFactory', 'usSpinnerService'];

  function adminViewEventsController($log, $modal, EventsFactory, usSpinnerService) {
    $log.info('ENTER as.views.admin.events');
    /*jshint validthis:true */
    var vm = this;
    var pristineEvent = {};

    vm.event = {};
    vm.events = [];

    function modelSavedEventForRequest() {
      var vmEvent = vm.event;
      var event = new EventsFactory();

      event.title = vmEvent.title;
      event.description = vmEvent.description;
      event.startTime = new Date(vmEvent.date).getTime() / 1000;
      event.endTime = event.startTime + 86399;  //for now an event's default endtime is 24h, minus 1 second

      return event;
    }

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

    vm.resetForm = function() {
      vm.event = angular.copy(pristineEvent);
    };

    vm.submitEvent = function() {
      usSpinnerService.spin('spinner-2');
      var event = modelSavedEventForRequest();

      event.$save(function() {
        usSpinnerService.stop('spinner-2');
        showModal('Success', 'Event: ' + vm.event.title + ' successfully made.');
        vm.resetForm();
      }, function (response) {
        usSpinnerService.stop('spinner-2');
        showModal('Error - ' + response.status, 'There was a problem creating the event.  Please try again.');
        vm.resetForm();
      });
    };

    vm.init = function() {
      usSpinnerService.spin('spinner-2');
      pristineEvent = angular.copy(vm.event);

      EventsFactory.query(function(response) {
        usSpinnerService.stop('spinner-2');
        vm.events = response;
      }, function(response) {
        usSpinnerService.stop('spinner-2');
        showModal('Error - ' + response.status, 'There was a problem getting events.  Please try again.');
      });
    };

    vm.init();
  }

}(angular));