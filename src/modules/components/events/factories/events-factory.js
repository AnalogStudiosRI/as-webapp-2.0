'use strict';

(function (angular) {

  angular
    .module('as.components.events')
    .factory('EventsFactory', eventsFactory);

  eventsFactory.$inject = ['$resource'];

  function eventsFactory($resource) {

    return $resource('/api/events/:id', {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }

}(angular));