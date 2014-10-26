angular.module('homePage', [
  'asBootstrap'
]).controller('HomeCtrl', [
  '$scope',
  function ($scope) {
    'use strict';

    console.log('ENTER THE HOME PAGE');

    //controller
    var HomeCtrl = this;


    //public methods
    HomeCtrl.init = function () {
      console.log('this is the home page');
    };

    HomeCtrl.lang = {
      welcomeText: 'Welcome to the Analog Studios website'
    };

    //init
    HomeCtrl.init();

    $scope.HomeCtrl = HomeCtrl;
  }
]);
