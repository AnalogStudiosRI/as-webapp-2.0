'use strict';

describe('as.module.header.directives.HeaderDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('as.module.header'));
  beforeEach(module('templates'));
  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<as-header></as-header>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test that five menu items exist', function () {
    expect(element.find('nav').length).toBe(1);
    expect(element.find('ul').length).toBe(1);
    expect(element.find('li').length).toBe(5);
  });

  it('should test that social badges are there', function () {
    expect(element.find('as-social-badges').length).toBe(1);
  });

  it('should test that it says Analog Studios', function () {
    expect(element.find('h2#studio-name').html()).toBe('Analog Studios');
  });

});