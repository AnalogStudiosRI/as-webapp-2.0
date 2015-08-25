'use strict';

describe('as.views.admin.controller.AdminViewControllerTest', function () {
  var scope;
  var ctrl;
  var dom;

  beforeEach(module('as.components.bootstrap'));
  beforeEach(module('as.views.admin'));

  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.AdminCtrl = {
      model: {}
    };

    ctrl = $controller('AdminViewController', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  it('it should test that the AdminCtrl is defined', function () {
    expect(scope.AdminCtrl).toBeDefined();
  });

});