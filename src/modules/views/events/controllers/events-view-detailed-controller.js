'use strict';

(function () {

  angular
    .module('as.views.events')
    .controller('EventsViewDetailedController', eventsViewDetailedController);

  eventsViewDetailedController.$inject = ['$scope', '$log', '$stateParams', 'EventsFactory'];

  function eventsViewDetailedController($scope, $log, $stateParams, EventsFactory) {
    $scope.event = [];

    function getEvent(id) {
      EventsFactory.query({eventId: id}, function (response) {

        $log.info(response);
        $scope.event = response[0];

      }, function (response) {

        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    $scope.init = function () {
      $log.info('Enter as.page.events.detailed.init');

      getEvent($stateParams.id);
    };

    $scope.init();
  }

}(angular));