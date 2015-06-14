'use strict';

xdescribe('as.page.admin.controller.HomePageControllerTest', function () {
  var scope;
  var ctrl;
  var dom;

  beforeEach(module('as.page.admin'));
  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.HomeCtrl = {
      model: {}
    };

    ctrl = $controller('AdminPageController', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  it('it should test something, eventually', function () {

  });

});