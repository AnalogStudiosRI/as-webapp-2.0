'use strict';

(function (angular) {

  angular
    .module('as.views.home')
    .controller('HomeViewController', homeViewContoller);

  homeViewContoller.$inject = ['$log', 'LanguageFactory'];

  function homeViewContoller($log, LanguageFactory) {
    /*jshint validthis:true */
    var vm = this;
    var LANG = LanguageFactory.get();

    //public members
    vm.welcomeText = LANG.PAGE.HOME.WELCOME;

    //public methods
    vm.init = function () {
      $log.info('Enter AS.HomeView.init');
    };

    //init
    vm.init();
  }

}(angular));