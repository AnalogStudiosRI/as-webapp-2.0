'use strict';

describe('as.page.home.controller.HomePageControllerTest', function () {
  var scope;
  var ctrl;
  var dom;

  beforeEach(module('as.page.home'));
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