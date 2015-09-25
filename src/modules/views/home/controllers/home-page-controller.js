'use strict';

(function (angular) {

  angular
    .module('as.views.home')
    .controller('HomeViewController', homeViewContoller);

  homeViewContoller.$inject = ['$scope', '$log', 'LanguageFactory'];

  function homeViewContoller($scope, $log, LanguageFactory) {
    //controller
    var HomeCtrl = {};
    var LANG = LanguageFactory.get();

    //public members
    HomeCtrl.welcomeText = LANG.PAGE.HOME.WELCOME;

    //public methods
    HomeCtrl.init = function () {
      $log.info('Enter AS.HomeView.init');
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }

}(angular));