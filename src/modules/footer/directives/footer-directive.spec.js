'use strict';

describe('as.module.footer.directive.FooterDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('as.module.bootstrap'));
  beforeEach(module('as.module.footer'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<as-footer></as-footer>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test the copyright is displayed correctly', function () {
    var currentYear = new Date().getFullYear();
    var copyright = '© 2007 - ' + currentYear;

    expect(element.find('p').html()).toBe(copyright);
    expect(element.find('p').length).toBe(1);
  });

});