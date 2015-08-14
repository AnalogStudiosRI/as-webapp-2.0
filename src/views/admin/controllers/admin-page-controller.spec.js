'use strict';

describe('as.page.admin.controller.AdminPageControllerTest', function () {
  var scope;
  var ctrl;
  var dom;

  beforeEach(module('as.page.admin'));
  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.AdminCtrl = {
      model: {}
    };

    ctrl = $controller('AdminPageController', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  it('it should test that the AdminCtrl is defined', function () {
    expect(scope.AdminCtrl).toBeDefined();
  });

});