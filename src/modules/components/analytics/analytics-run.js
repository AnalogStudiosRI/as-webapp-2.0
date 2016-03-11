'use strict';

(function (angular) {

  angular
    .module('as.components.analytics')
    .run(AnalyticsRun);

  AnalyticsRun.$inject = ['$rootScope', '$location', 'Analytics', 'ANALYTICS_CONFIG'];

  function AnalyticsRun($rootScope, $location, Analytics, ANALYTICS_CONFIG) {
    var host = $location.host();

    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if (host.indexOf(ANALYTICS_CONFIG.DOMAIN) >= 0) {
        Analytics.trackPage(toState.url);
      }
    });
  }

})(angular);