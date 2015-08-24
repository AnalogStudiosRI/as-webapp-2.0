'use strict';

(function (angular) {

  angular
    .module('as.views.events')
    .config(EventsViewConfig);

  EventsViewConfig.$inject = ['$stateProvider'];

  function EventsViewConfig($stateProvider) {
    $stateProvider.state('events', {
      url: '/events',
      templateUrl: '/views/events/templates/events.html',
      controller: 'EventsViewController'
    });
  }

})(angular);