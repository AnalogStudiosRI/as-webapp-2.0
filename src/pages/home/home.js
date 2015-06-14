angular.module('homePage', [
  'AS.Bootstrap'
]).controller('HomeCtrl', [
  '$scope',
  'Log4ng',
  'LanguageFactory',
  function ($scope, Log, LanguageFactory) {
    'use strict';

    Log.debug('ENTER THE HOME PAGE');

    //controller
    var HomeCtrl = this;
    var LANG = LanguageFactory.get();

    //public methods
    HomeCtrl.init = function () {
      Log.info('this is the home page');

      HomeCtrl.welcomeText = LANG.PAGE.HOME.WELCOME_TEXT;
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }
]);
