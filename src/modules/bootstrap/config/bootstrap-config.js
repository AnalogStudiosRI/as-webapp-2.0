'use strict';

(function (angular) {

  angular
    .module('as.module.bootstrap')
    .config(bootstrapConfig);

  bootstrapConfig.$inject = ['$interpolateProvider'];

  function bootstrapConfig($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }

})(angular);