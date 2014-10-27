angular.module('homePage', [
  'asBootstrap'
]).controller('HomeCtrl', [
  '$scope',
  'Config',
  'Log4ng',
  'Language',
  function ($scope, Config, Log, Language) {
    'use strict';

    Log.debug('ENTER THE HOME PAGE');

    //controller
    var HomeCtrl = this;
    var lang = Language.PAGE.HOME;

    //public methods
    HomeCtrl.init = function () {
      Log.info('this is the home page');

      HomeCtrl.welcomeText = lang.WELCOME_TEXT;
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }
]);
