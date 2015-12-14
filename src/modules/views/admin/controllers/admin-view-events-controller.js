'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewEventsController', adminViewEventsController);

  adminViewEventsController.$inject = ['$log', 'EventsFactory'];

  function adminViewEventsController($log, EventsFactory) {
    $log.info('ENTER as.views.admin.events');
    /*jshint validthis:true */
    var vm = this;

    vm.event = {
      title: '',
      description: '',
      date: ''
    };

    function modelSavedEventForRequest() {
      var vmEvent = vm.event;
      var event = new EventsFactory();

      event.title = vmEvent.title;
      event.description = vmEvent.description;
      event.startTime = new Date(vmEvent.date).getTime() / 1000;
      event.endTime = event.startTime + 86499;  //for now event spans the day, minus 1 second

      return event;
    }

    vm.submitEvent = function() {
      var event = modelSavedEventForRequest();
      $log.debug(event);
      event.$save(function() {
        $log.debug('yes!');
      }, function () {
        $log.debug('no');
      });
    };

  }

}(angular));