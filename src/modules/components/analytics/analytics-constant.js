'use strict';

(function (angular) {

  angular
    .module('as.components.analytics')
    .constant('ANALYTICS_CONFIG', {
      DOMAIN: 'analogstudios.net',
      GOOGLE: {
        ACCOUNT: 'UA-69272660-1'
      }
    });

})(angular);