angular.module('eventsPage', [
  'asBootstrap',
  'events',
  'calendar'
]).controller('EventsCtrl', [
  '$scope',
  'Log4ng',
  'Events',
  function ($scope, Log4ng, Events) {
    'use strict';

    Log4ng.debug('ENTER The Events Page');

    //controller
    var EventsCtrl = this;

    //private members

    //private methods
    function getEvents() {
      Log4ng.debug(new Date().getTime());
      Events.query(function (response) {
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

    $scope.EventsCtrl = EventsCtrl;

    //init
    (function () {
      getEvents();
    }());

  }
]);
