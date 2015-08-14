'use strict';

(function (angular) {

  angular
    .module('as.component.bootstrap')
    .config(BootstrapConfig);

  BootstrapConfig.$inject = ['$urlRouterProvider', '$logProvider'];

  function BootstrapConfig($urlRouterProvider, $logProvider) {

    //$locationProvider.html5Mode(true);
    $logProvider.debugEnabled(true);

    $urlRouterProvider.otherwise('home');

  }

})(angular);