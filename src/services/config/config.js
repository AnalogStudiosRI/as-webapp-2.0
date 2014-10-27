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
      CHECKOUT_URL: {
        CANCEL: location.host + '/checkout/?orderStatus=cancel',
        SUCCESS: location.host + '/checkout/?orderStatus=success'
      },
      DEFAULT_CATEGORY: 'Other',
      ENDPOINT: {
        CATEGORY: '/api/category/:cid',
        LOGGER: '/api/logger/',
        ORDER: '/api/order/:oid',
        PRODUCT: '/api/product',
        SESSION: '/api/session/',
        SETTING: '/api/setting/:sid'
      },
      LINK: {
        ETSY: 'http://www.etsy.com/shop/1000BC?ref=ss_profile',
        FACEBOOK: 'http://www.facebook.com/pages/1000-BC/271010322910307'
      },
      LOG_LEVEL: 0,
      PRODUCTS_IMG_PATH: '/assets/',
      TIMER: {
        SLIDESHOW: 5000 //3 seconds
      }
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
