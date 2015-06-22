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

    //public members
    HomeCtrl.welcomeText = LANG.PAGE.HOME.WELCOME;

    //public methods
    HomeCtrl.init = function () {
      $log.info('Enter AS.HomePage.init');
      $log.debug(HomeCtrl.welcomeText);
      $log.debug(LANG);
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }

}(angular));