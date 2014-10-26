angular.module('asBootstrap', [
  //'config',
  //'log4ng',
  //'language',
  //'socialBadges'
]).config(function ($interpolateProvider) {
  'use strict';

  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');

  //XXX TODO init logger here
});
