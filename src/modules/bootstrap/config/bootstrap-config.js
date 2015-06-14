'use strict';

(function (angular) {

  angular
    .module('AS.Bootstrap')
    .config(bootstrapConfig);

  bootstrapConfig.$inject = ['$interpolateProvider'];

  function bootstrapConfig($interpolateProvider) {

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }

})(angular);