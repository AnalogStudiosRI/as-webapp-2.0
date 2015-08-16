'use strict';

describe('as.components.header.directives.HeaderDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('as.components.header'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<section><as-header></as-header></section>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test that the header element exist', function () {
    expect(element.find('header').length).toBe(1);
  });

  it('should test that the navigation menu exist', function () {
    expect(element.find('as-navigation').length).toBe(1);
  });

  it('should test that social badges are there', function () {
    expect(element.find('i').length).toBe(3);
  });

  it('should test that it says Analog Studios', function () {
    var studioName = angular.element(element[0].querySelector('div.studio-name')).html();

    expect(studioName).toBe('Analog Studios');
  });

});