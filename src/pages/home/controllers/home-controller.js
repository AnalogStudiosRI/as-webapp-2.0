'use strict';

(function (angular) {

  angular
    .module('AS.HomePage')
    .controller('HomePageController', homePageContoller);

  homePageContoller.$inject = ['$scope', 'Log4ng', 'LanguageFactory'];

  function homePageContoller($scope, Log, LanguageFactory) {
    //controller
    var HomeCtrl = {};
    var LANG = LanguageFactory.get();

    //public methods
    HomeCtrl.init = function () {
      Log.info('Enter AS.HomePage.init');

      HomeCtrl.welcomeText = LANG.PAGE.HOME.WELCOME_TEXT;
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }

}(angular));