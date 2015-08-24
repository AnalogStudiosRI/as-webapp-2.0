'use strict';

(function () {

  angular
    .module('as.views.events')
    .controller('EventsViewController', eventsViewController);

  eventsViewController.$inject = ['$scope', '$log', 'EventsFactory'];

  function eventsViewController($scope, $log, EventsFactory) {
    $scope.events = [];
    $scope.selectedEvent = null;

    //private methods
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

    function getEvents() {
      EventsFactory.query(function (response) {

        $log.info(response);
        $scope.events = parseEventsResponse(response);
      }, function (response) {

        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    $scope.eventClick = function (event) {
      $log.debug('you clicked a day');
      $log.debug(event);
      $scope.selectedEvent = event;
    };

    $scope.init = function () {
      $log.info('Enter as.page.events.init');

      getEvents();
    };

    $scope.init();
  }

}(angular));