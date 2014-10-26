angular.module('homePage', []).controller('HomeCtrl', [
  '$scope',
  function () {
    'use strict';

    //controller
    var HomeCtrl = this;


    //public methods
    HomeCtrl.init = function () {
      console.log('this is the home page');
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }
]);
