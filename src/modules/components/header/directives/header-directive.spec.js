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

  it('should test that two banner images exist', function () {
    expect(element.find('img').length).toBe(2);
  });

});