'use strict';

(function () {

  angular
    .module('as.page.events')
    .controller('EventsPageController', eventsPageController);

  eventsPageController.$inject = ['$scope', '$log', 'EventsFactory'];

  function eventsPageController($scope, $log, EventsFactory) {
    $scope.events = [];

    //private methods
    function parseEventsResponse(response) {
      var events = [];

      _.forEach(response, function (n) {
        var time = parseInt(n.startTime * 1000);
        var eventDate = new Date(time);

        events.push({
          date: eventDate,
          status: 'partially'
        });
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

    $scope.init = function () {
      $log.info('Enter as.page.events.init');

      getEvents();
    };

    $scope.init();
  }

}(angular));