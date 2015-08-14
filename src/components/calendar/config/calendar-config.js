'use strict';

(function (angular) {

  angular
    .module('as.component.calendar')
    .config(calendarConfig);

  calendarConfig.$inject = ['$provide'];

  function calendarConfig($provide) {

    $provide.decorator('datepickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/calendar/templates/datapicker.html';

      return $delegate;
    }]);

    $provide.decorator('daypickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/calendar/templates/day.html';

      return $delegate;
    }]);

    $provide.decorator('monthpickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/calendar/templates/month.html';

      return $delegate;
    }]);

    $provide.decorator('yearpickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/calendar/templates/year.html';

      return $delegate;
    }]);
  }

})(angular);