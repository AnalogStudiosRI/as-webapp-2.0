'use strict';

describe('as.module.calendar.directives.CalendarDirectiveTest', function () {

  var element;
  var scope;

  beforeEach(module('ui.bootstrap'));
  beforeEach(module('as.module.calendar'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope;
    element = angular.element('<as-calendar event-data="eventData"></as-calendar>');

    scope.eventData = [];

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test that a datepicker.calendar is present', function () {
    expect(element.find('.calendar').length).toBe(1);
  });

});