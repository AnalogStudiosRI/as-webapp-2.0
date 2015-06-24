'use strict';

(function () {

  angular
    .module('as.page.events')
    .controller('EventsPageController', eventsPageController);

  eventsPageController.$inject = ['$scope', '$log', 'EventsFactory'];

  function eventsPageController($scope, $log, EventsFactory) {

    //private members

    //private methods
    function getEvents() {
      EventsFactory.query(function (response) {
        $log.info(response);
        //setEvents(response);
      }, function (response) {
        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    $scope.init = function () {
      $log.info('Enter AS.EventsPage.init');

      getEvents();
    };

    $scope.init();
  }

}(angular));