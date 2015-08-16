'use strict';

(function () {

  angular
    .module('as.views.events')
    .controller('EventsViewController', eventsViewController);

  eventsViewController.$inject = ['$scope', '$log', '$state', 'EventsFactory'];

  function eventsViewController($scope, $log, $state, EventsFactory) {
    $scope.events = [];
    $scope.selectedEvent = null;
    $scope.showEvents = false;

    //private methods
    function parseEventsResponse(response) {
      var events = [];
      var i = 0;

      _.forEach(response, function (n) {
        var event = n;

        if (i === 0) {
          $log.debug('parseEventsResponse');
          $log.debug(new Date().getTime());
          event.startTime = new Date().getTime();
        }

        var time = parseInt(event.startTime * 1000);
        var eventDate = new Date(time);

        event.date = eventDate;

        events.push(event);

        i += 1;
      });

      return events;
    }

    function getEvents() {
      EventsFactory.query(function (response) {

        $log.info(response);
        $scope.events = parseEventsResponse(response);
        $scope.showEvents = $scope.events.length > 0;
      }, function (response) {

        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    $scope.eventClick = function (event) {
      $scope.showEvents = false;
      $state.go('events.detailed', {id: event.id});
    };

    $scope.init = function () {
      $log.info('Enter as.page.events.init');

      getEvents();
    };

    $scope.init();
  }

}(angular));