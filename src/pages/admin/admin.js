angular.module('adminPage', [
  'AS.Bootstrap'
]).controller('AdminCtrl', [
  '$scope',
  'Log4ng',
  function ($scope, Log) {
    'use strict';

    Log.debug('ENTER THE Admin PAGE');

    //controller
    var AdminCtrl = this;

    $scope.AdminCtrl = AdminCtrl;
  }
]);
