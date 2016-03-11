'use strict';

(function (angular) {

  angular
    .module('as.bootstrap')
    .config(BootstrapConfig);

  BootstrapConfig.$inject = ['$urlRouterProvider', '$logProvider', 'AnalyticsProvider'];

  function BootstrapConfig($urlRouterProvider, $logProvider, AnalyticsProvider) {
    AnalyticsProvider.setAccount('UA-69272660-1');
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');

    $logProvider.debugEnabled(true);

    $urlRouterProvider.otherwise('/home/');
  }

})(angular);