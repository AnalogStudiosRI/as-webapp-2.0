/**
 * The config module contains configurations that are used by the entire site.
 */
'use strict';

angular.module('config',
  []
).constant('CONFIG', {
  ENDPOINT: {
    EVENTS: '/api/events/:id',
    LOGGER: 'http://'
  },
  LOG_LEVEL: 0
}).factory('Config', ['CONFIG', function (CONFIG) {

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
]);
