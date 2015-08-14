'use strict';

describe('as.components.header.directives.HeaderDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('as.components.bootstrap'));
  beforeEach(module('as.components.header'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<as-header></as-header>');

    $compile(element)(scope);
    scope.$digest();
  }));

  function getMenuLabel(idx) {
    return angular.element(element[0].querySelectorAll('a.nav-link')[idx]).html()
  }

  it('should test that five menu items exist', function () {
    expect(element.find('nav').length).toBe(1);
    expect(element.find('ul').length).toBe(1);
    expect(element.find('li').length).toBe(5);

    expect(getMenuLabel(0)).toBe('the studio');
    expect(getMenuLabel(1)).toBe('artists');
    expect(getMenuLabel(2)).toBe('events');
    expect(getMenuLabel(3)).toBe('media');
    expect(getMenuLabel(4)).toBe('contact');
  });

  it('should test that social badges are there', function () {
    expect(element.find('i').length).toBe(3);
  });

  it('should test that it says Analog Studios', function () {
    var studioName = angular.element(element[0].querySelector('div#studio-name')).html();

    expect(studioName).toBe('Analog Studios');
  });

});