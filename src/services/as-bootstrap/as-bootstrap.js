angular.module('asBootstrap', [
  'config',
  'log4ng',
  'language'
]).config([
  '$interpolateProvider',
  function ($interpolateProvider) {
    'use strict';

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }
]);
