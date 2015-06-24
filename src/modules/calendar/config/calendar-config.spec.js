'use strict';

xdescribe('as.module.calendar.config.CalendarConfigTest', function () {

  var element;
  var scope;
  var provide;

  //beforeEach(module('ui.bootstrap'));
  //beforeEach(module('as.module.bootstrap'));
  beforeEach(module('as.module.calendar'));
  beforeEach(module('templates'));

  beforeEach(inject(function ($rootScope, $compile, $provide) {
    provide = $provide;
    scope = $rootScope;
    element = angular.element('<as-calendar></as-calendar>');

    $compile(element)(scope);
    scope.$digest();
  }));

  it('should test that all datepicker decorators are correct', function () {
    provide.decorator('datepickerDirective', ['$delegate', function ($delegate) {
      expect($delegate[0].templateUrl).toBe('/modules/datepicker/templates/datapicker.html');
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      //$delegate[0].templateUrl = ;

      //return $delegate;
    }]);

  });

});