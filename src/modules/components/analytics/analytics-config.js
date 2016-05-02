'use strict';

(function (angular) {

  angular
    .module('as.components.analytics')
    .config(AnalyticsConfig);

  AnalyticsConfig.$inject = ['$windowProvider', 'AnalyticsProvider', 'ANALYTICS_CONFIG'];

  function AnalyticsConfig($windowProvider, AnalyticsProvider, ANALYTICS_CONFIG) {
    var host = $windowProvider.$get().location.host;

    if (host.indexOf(ANALYTICS_CONFIG.DOMAIN) >= 0) {
      AnalyticsProvider.setAccount(ANALYTICS_CONFIG.GOOGLE.ACCOUNT);
      AnalyticsProvider.setPageEvent('$stateChangeSuccess');
    }
  }

})(angular);