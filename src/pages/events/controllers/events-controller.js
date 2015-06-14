'use strict';

(function () {

  angular
    .module('AS.EventsPage')
    .controller('EventsPageController', eventsPageController);

  eventsPageController.$inject = ['$scope', 'Log4ng', 'EventsFactory'];

  function eventsPageController($scope, Log4ng, EventsFactory) {
    //controller
    var EventsCtrl = {};

    //private members

    //private methods
    function getEvents() {
      Log4ng.debug(new Date().getTime());
      EventsFactory.query(function (response) {
        Log4ng.info('getEvents success');
        Log4ng.debug(response);
        EventsCtrl.model.events = response;
      }, function (response) {
        Log4ng.error('getEvents failure');
        Log4ng.error(response);
      });
    }

    //public members
    EventsCtrl.model = {
      events: []
    };

    EventsCtrl.init = function () {
      Log4ng.info('Enter AS.EventsPage.init');

      getEvents();
    };

    $scope.EventsCtrl = EventsCtrl;

    EventsCtrl.init();
  }

}(angular));