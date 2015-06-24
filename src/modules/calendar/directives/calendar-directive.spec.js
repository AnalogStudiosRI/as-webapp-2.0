'use strict';

describe('as.module.calendar.directives.CalendarDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('ui.bootstrap'));
  beforeEach(module('as.module.bootstrap'));
  beforeEach(module('as.module.calendar'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<as-calendar></as-calendar>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test that a datepicker.calendar is present', function () {
    expect(element.find('.calendar').length).toBe(1);
  });

});