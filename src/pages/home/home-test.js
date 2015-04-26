describe('home', function () {
  'use strict';

  var scope, ctrl, dom;

  beforeEach(module('home'));
  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.HomeCtrl = {
      model: {}
    };

    ctrl = $controller('HomeCtrl', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  xit('it should test something, eventually', function () {

  });

});
