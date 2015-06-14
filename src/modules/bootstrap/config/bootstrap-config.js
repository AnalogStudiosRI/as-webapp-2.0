'use strict';

(function (angular) {

  angular
    .module('AS.Bootstrap')
    .config(bootstrapConfig);

  bootstrapConfig.$inject = ['$interpolateProvider'];

  function bootstrapConfig() {
    //$interpolateProvider.startSymbol('[[');
    //$interpolateProvider.endSymbol(']]');
  }

})(angular);