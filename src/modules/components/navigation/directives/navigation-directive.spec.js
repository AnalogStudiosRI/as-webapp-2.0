'use strict';

describe('as.components.navigation.directives.NavigationDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('as.components.navigation'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<section><as-navigation></as-navigation></section>');

    $compile(element)(scope);
    scope.$digest();
  }));

  function getMenuLabel(idx) {
    return angular.element(element[0].querySelectorAll('.menu-links')[idx]).html();
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

});