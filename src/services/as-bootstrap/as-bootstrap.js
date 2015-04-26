angular.module('asBootstrap', [
  'config',
  'log4ng',
  'language',
  'header',
  'footer'
]).config([
  '$interpolateProvider',
  function ($interpolateProvider) {
    'use strict';

    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  }
]);
