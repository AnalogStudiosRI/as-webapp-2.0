'use strict';

describe('as.views.home.controller.HomeViewControllerTest', function () {
  var scope;
  var ctrl;
  var dom;

  beforeEach(module('as.bootstrap'));
  beforeEach(module('as.components.socialShare'));
  beforeEach(module('as.views.home'));

  beforeEach(inject(function ($compile, $rootScope, $controller) {
    scope = $rootScope.$new();
    dom = angular.element('<div></div>');

    scope.HomeCtrl = {
      model: {}
    };

    ctrl = $controller('HomeViewController', {
      $scope: scope
    });

    $compile(dom)(scope);
    scope.$digest();
  }));

  it('it should test that the HomeCtrl and scope properties are defined', function () {
    expect(scope.HomeCtrl).toBeDefined();
    expect(scope.HomeCtrl.welcomeText).toBeDefined();
  });

  it('it should test that the Welcome text is correct', function () {
    expect(scope.HomeCtrl.welcomeText).toBe('Welcome to the Analog Studios website');
  });

  xit('it should test that social share is seen', function () {
    expect(dom.find('as-social-share').length).toBe(1);
  });

});