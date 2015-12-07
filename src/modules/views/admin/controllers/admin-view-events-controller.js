'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewEventsController', adminViewEventsController);

  adminViewEventsController.$inject = ['$log', 'EventsFactory'];

  function adminViewEventsController($log) {
    $log.info('ENTER as.views.admin.events');
    /*jshint validthis:true */
    var vm = this;

    vm.event = {
      title: '',
      description: '',
      date: ''
    };

    vm.submitEvent = function () {
      $log.debug(vm.event);
      $log.debug();
    };

  }

}(angular));