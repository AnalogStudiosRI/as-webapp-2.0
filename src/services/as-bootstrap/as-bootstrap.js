'use strict';

angular.module('asBootstrap', [
  'config',
  'log4ng',
  'language',
  'AS.HeaderModule',
  'AS.FooterModule'
]).config([
  '$interpolateProvider',
  function ($interpolateProvider) {

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }
]);
