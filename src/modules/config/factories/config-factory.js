'use strict';

(function (angular) {

  var asConfig = {
    ENDPOINT: {
      EVENTS: '/api/events/:id',
      LOGGER: 'http://'
    },
    LOG_LEVEL: 0
  };

  angular
    .module('as.module.config')
    .constant('CONFIG', asConfig)
    .factory('ConfigFactory', configFactory);

  configFactory.$inject = ['CONFIG'];

  function configFactory(CONFIG) {

    return {
      get: function (selectorString) {
        var customConfigObj = {};

        if (selectorString === '*') {
          customConfigObj = _.cloneDeep(CONFIG);
        } else {
          var workingCustomConfig = _.cloneDeep(CONFIG);
          var currentConfigLevel = _.cloneDeep(CONFIG);

          _.each(selectorString.split('.'), function (queryKey) {
            if (currentConfigLevel.hasOwnProperty(queryKey)) {
              var currentValue = currentConfigLevel[queryKey];

              //assign and update pointers
              workingCustomConfig = currentValue;
              currentConfigLevel = currentValue;
            } else {
              throw new Error('unsupported property => ' + queryKey);
            }
          });

          customConfigObj = workingCustomConfig;
        }

        return customConfigObj;
      }
    };
  }

}(angular));