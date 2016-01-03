'use strict';

/*
 * The PuSubFactory provides an interface for other modules to subscribe to events set by other modules
 */
(function (angular) {

  angular
    .module('as.components.pubsub')
    .factory('PubSubFactory', PubSubFactory);

  function PubSubFactory() {
    var subscription = {};

    return {
      register: function (name) {
        subscription[name] = {
          name: name,
          callbacks: []
        };
      },

      publish: function (name, data) {
        angular.forEach(subscription[name].callbacks, function(callback) {
          callback(data);
        });
      },

      subscribe: function (name, callback) {
        subscription[name].callbacks.push(callback);
      }
    };

  }
}(angular));