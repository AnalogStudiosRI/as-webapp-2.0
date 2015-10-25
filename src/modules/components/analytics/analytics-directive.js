'use strict';

(function (angular) {
  angular
    .module('as.components.analytics')
    .directive('asAnalytics', asAnalyticsDirective);

  analyticsDirectiveController.$inject = ['$log', '$location'];

  function asAnalyticsDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/components/analytics/analytics-directive-template.html',
      controller: analyticsDirectiveController,
      controllerAs: 'AnalyticsController'
    };
  }

  function analyticsDirectiveController($log, $location) {
    /*jshint validthis: true */
    var vm = this;

    vm.isProd = getIsProductionEnvironmen();

    function getIsProductionEnvironmen() {
      var host = $location.host();
      $log.debug('host => ' + host);
      var isDev = host.indexOf('thegreenhouse.io') > 0;

      $log.debug('isDev => ' + isDev);
      return !isDev;
    }
  }

})(angular);