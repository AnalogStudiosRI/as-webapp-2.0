angular.module('asBootstrap', [
  'log4ng',
  'config',
  'language'
]).config(function ($interpolateProvider) {
  'use strict';

  //Log = new Log4ng(0, '///');

  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');

  //XXX TODO init logger here
});
