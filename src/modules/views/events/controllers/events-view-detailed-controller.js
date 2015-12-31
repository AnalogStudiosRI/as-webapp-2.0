'use strict';

(function () {

  angular
    .module('as.views.events')
    .controller('EventsViewDetailedController', eventsViewDetailedController);

  eventsViewDetailedController.$inject = ['$log', '$stateParams', 'EventsFactory'];

  function eventsViewDetailedController($log, $stateParams, EventsFactory) {
    /*jshint validthis:true */
    var vm = this;

    vm.event = [];

    function getEvent(id) {
      EventsFactory.query({eventId: id}, function (response) {

        $log.info(response);
        vm.event = response[0];

      }, function (response) {

        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    vm.init = function () {
      $log.info('Enter as.view.events.detailed.init');
      $log.debug($stateParams);
      getEvent($stateParams.id);
    };

    vm.init();
  }

}(angular));