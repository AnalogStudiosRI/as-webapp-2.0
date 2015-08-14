'use strict';

(function (angular) {

  angular
    .module('as.view.home')
    .config(HomeViewConfig);

  HomeViewConfig.$inject = ['$stateProvider'];

  function HomeViewConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/views/home/templates/home.html',
        controller: 'HomeViewController'
      });
  }

})(angular);
