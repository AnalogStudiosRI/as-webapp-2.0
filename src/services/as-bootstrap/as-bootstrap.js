angular.module('asBootstrap', [
  'config',
  'log4ng',
  'language'
]).config(function ($interpolateProvider) {
  'use strict';

  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');

});
