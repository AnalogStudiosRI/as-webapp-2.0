'use strict';

(function (angular) {

  angular
    .module('as.module.calendar')
    .config(calendarConfig);

  calendarConfig.$inject = ['$provide'];

  function calendarConfig($provide) {

    $provide.decorator('datepickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/datepicker/templates/datapicker.html';

      return $delegate;
    }]);

    $provide.decorator('daypickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/datepicker/templates/day.html';

      return $delegate;
    }]);

    $provide.decorator('monthpickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/datepicker/templates/month.html';

      return $delegate;
    }]);

    $provide.decorator('yearpickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/modules/datepicker/templates/year.html';

      return $delegate;
    }]);
  }

})(angular);