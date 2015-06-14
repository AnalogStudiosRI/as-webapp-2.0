'use strict';

(function (angular) {

  angular
    .module('AS.Events')
    .factory('EventsFactory', eventsFactory);

  eventsFactory.$inject = ['$resource', 'Config'];

  function eventsFactory($resource, Config) {
    var ENDPOINT = Config.get('ENDPOINT.EVENTS');

    return $resource(ENDPOINT, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
}(angular));