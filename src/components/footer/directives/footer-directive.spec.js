'use strict';

describe('as.components.footer.directive.FooterDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('as.components.footer'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<section><as-footer></as-footer></section>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test the footer element exists', function () {
    expect(element.find('footer').length).toBe(1);
  });

  it('should test the copyright is displayed correctly', function () {
    var currentYear = new Date().getFullYear();
    var copyright = '© 2007 - ' + currentYear + ' Analog Studios';

    expect(element.find('footer').length).toBe(1);
    expect(element.find('p').html()).toBe(copyright);
    expect(element.find('p').length).toBe(1);
  });

});