describe('AS.HomePage.Controller.HomePageControllerTest', function () {
  'use strict';

  var scope;
  var ctrl;
  var dom;

  beforeEach(module('AS.HomePage'));
  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.HomeCtrl = {
      model: {}
    };

    ctrl = $controller('HomePageController', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  xit('it should test something, eventually', function () {

  });

});