angular.module('homePage', [
  'asBootstrap'
]).controller('HomeCtrl', [
  '$scope',
  function ($scope, Log) {
    'use strict';

    Log.debug('ENTER THE HOME PAGE');

    //controller
    var HomeCtrl = this;


    //public methods
    HomeCtrl.init = function () {
      Log.info('this is the home page');
    };

    HomeCtrl.lang = {
      welcomeText: 'Welcome to the Analog Studios website'
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }
]);
