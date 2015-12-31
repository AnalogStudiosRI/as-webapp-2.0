'use strict';

(function (angular) {

  angular
    .module('as.views.home')
    .controller('HomeViewController', homeViewContoller);

  homeViewContoller.$inject = ['$log', '$state', 'EventsFactory'];

  function homeViewContoller($log, $state, EventsFactory) {
    /*jshint validthis:true */
    var vm = this;

    vm.events = [];

    function parseEventsResponse(response) {
      var events = [];

      _.forEach(response, function (n) {
        var event = n;
        var time = parseInt(event.startTime * 1000);
        var eventDate = new Date(time);

        event.date = eventDate;

        events.push(event);
      });

      return events;
    }

    //public methods
    vm.init = function () {
      $log.info('Enter AS.HomeView.init');

      EventsFactory.query(function (data) {
        $log.debug('!!!!!!');
        $log.debug(data);
        vm.events = parseEventsResponse(data);
      }, function() {
        $log.error('omg');
      });
    };

    //init
    vm.init();

    vm.eventClick = function (eventData) {
      $log.debug(eventData);
      $state.go('events-view-detailed', eventData);
    };
  }

}(angular));