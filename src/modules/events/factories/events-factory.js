'use strict';

(function (angular) {

  angular
    .module('as.module.events')
    .factory('EventsFactory', eventsFactory);

  eventsFactory.$inject = ['$resource', 'ConfigFactory'];

  function eventsFactory($resource, ConfigFactory) {
    var ENDPOINT = ConfigFactory.get('ENDPOINT.EVENTS');

    return $resource(ENDPOINT, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
}(angular));