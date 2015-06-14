describe('header', function () {
  'use strict';

  var element;
  var scope;

  beforeEach(module('header'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<header></header>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test that five menu items exist', function () {
    expect(element.find('nav').length).toBe(1);
    expect(element.find('ul').length).toBe(1);
    expect(element.find('li').length).toBe(5);
  });

});