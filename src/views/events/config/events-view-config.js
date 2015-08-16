'use strict';

(function (angular) {

  angular
    .module('as.views.events')
    .config(EventsViewConfig);

  EventsViewConfig.$inject = ['$stateProvider'];

  function EventsViewConfig($stateProvider) {
    $stateProvider.state('events-view', {
      url: '/events/',
      templateUrl: '/views/events/templates/events-view.html',
      controller: 'EventsViewController'
    }).state('events-view-detailed', {
      url: '^/events/{id:int}',
      templateUrl: '/views/events/templates/events-view-detailed.html',
      controller: 'EventsViewDetailedController'
    });
  }

})(angular);