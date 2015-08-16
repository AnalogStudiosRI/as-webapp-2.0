'use strict';

(function () {

  angular
    .module('as.views.events')
    .controller('EventsViewController', eventsViewController);

  eventsViewController.$inject = ['$scope', '$log', '$state', '$stateParams', 'EventsFactory'];

  function eventsViewController($scope, $log, $state, $stateParams, EventsFactory) {
    $scope.events = [];
    $scope.selectedEvent = null;
    $scope.showEvents = false;

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
      $log.debug('sfsddsf');
      $log.debug($stateParams);
      getEvents();
    };

    $scope.init();
  }

}(angular));