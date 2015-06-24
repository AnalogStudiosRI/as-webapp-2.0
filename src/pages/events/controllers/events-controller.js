'use strict';

(function () {

  angular
    .module('as.page.events')
    .controller('EventsPageController', eventsPageController);

  eventsPageController.$inject = ['$scope', '$log', 'EventsFactory'];

  function eventsPageController($scope, $log, EventsFactory) {
    //controller
    var EventsCtrl = {};

    //private members

    //private methods
    function getEvents() {
      $log.debug(new Date().getTime());
      EventsFactory.query(function (response) {
        $log.info('getEvents success');
        $log.debug(response);
        EventsCtrl.model.events = response;
      }, function (response) {
        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    //public members
    EventsCtrl.model = {
      events: []
    };

    EventsCtrl.init = function () {
      $log.info('Enter AS.EventsPage.init');

      getEvents();
    };

    $scope.EventsCtrl = EventsCtrl;

    EventsCtrl.init();
  }

}(angular));