'use strict';

(function () {

  angular
    .module('as.views.events')
    .controller('EventsViewDetailedController', eventsViewDetailedController);

  eventsViewDetailedController.$inject = ['$log', '$stateParams', '$sce', 'EventsFactory'];

  function eventsViewDetailedController($log, $stateParams, $sce, EventsFactory) {
    /*jshint validthis:true */
    var vm = this;

    vm.event = [];

    function getEvent(id) {
      EventsFactory.query({eventId: id}, function (response) {

        $log.info(response);
        vm.event = response[0];
        $log.debug('desc', vm.event.description);
        vm.event.description = $sce.trustAsHtml(vm.event.description);

      }, function (response) {
        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    vm.init = function () {
      getEvent($stateParams.id);
    };

    vm.init();
  }

}(angular));