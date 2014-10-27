/**
 * The config module contains configurations that are used by the entire site.
 */
angular.module('config',
  []
).factory('Config', function () {
  'use strict';

  //templateCache
  var Config = function () {
    var APP_CONFIG = {
      ENDPOINT: {
        LOGGER: ''
      },
      LOG_LEVEL: 0
    };

    this.get = function (selectorString) {
      var customConfigObj = {};

      if (selectorString === '*') {
        customConfigObj = _.cloneDeep(APP_CONFIG);
      } else {
        var workingCustomConfig = _.cloneDeep(APP_CONFIG);
        var currentConfigLevel = _.cloneDeep(APP_CONFIG);

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
    };

    return this;
  };

  return new Config();
});
