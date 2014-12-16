angular.module('events', [
  'ngResource',
  'config',
  'log4ng'
]).factory('Events', [
  '$resource',
  'Config',
  'Log4ng',
  function ($resource, Config) {
    'use strict';

    var ENDPOINT = Config.get('ENDPOINT.EVENTS');

    return $resource(ENDPOINT, {id: '@id'}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);