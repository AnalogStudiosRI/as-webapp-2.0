'use strict';

(function (angular) {

  angular
    .module('as.page.home')
    .controller('HomePageController', homePageContoller);

  homePageContoller.$inject = ['$scope', '$log', 'LanguageFactory'];

  function homePageContoller($scope, $log, LanguageFactory) {
    //controller
    var HomeCtrl = {};
    var LANG = LanguageFactory.get();

    //public methods
    HomeCtrl.init = function () {
      $log.info('Enter AS.HomePage.init');

      HomeCtrl.welcomeText = LANG.PAGE.HOME.WELCOME_TEXT;
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }

}(angular));