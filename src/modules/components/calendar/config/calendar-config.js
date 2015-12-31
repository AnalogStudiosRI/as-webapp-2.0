'use strict';

(function (angular) {

  angular
    .module('as.components.calendar')
    .config(calendarConfig);

  calendarConfig.$inject = ['$provide'];

  function calendarConfig($provide) {

    $provide.decorator('datepickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      var directive = $delegate[0];
      var link = directive.link;

      $delegate[0].templateUrl = '/components/calendar/templates/datapicker.html';

      //https://gist.github.com/cgmartin/3daa01f910601ced9cd3
      //http://stackoverflow.com/questions/32656556/detect-the-selected-month-in-angular-ui-bootstrap-datepicker
      directive.compile = function() {

        return function(scope, element, attrs, ctrls) {
          link.apply(this, arguments);

          var datepickerCtrl = ctrls[0];
          var ngModelCtrl = ctrls[1];
          var originalMove = scope.move;

          if (ngModelCtrl) {
            // Listen for 'refreshDatepickers' event...
            scope.$on('refreshDatepickers', function refreshView() {
              datepickerCtrl.refreshView();
            });
          }

          scope.move = function() {
            originalMove.apply(this, arguments);
            //when move is called, the 'this' object contains a 'title' property with the current month!
            //emit the event to parent scopes
            scope.$emit('datepicker.monthChanged', this.title);
          };
        };
      };

      return $delegate;
    }]);

    $provide.decorator('daypickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/components/calendar/templates/day.html';

      return $delegate;
    }]);

    $provide.decorator('monthpickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/components/calendar/templates/month.html';

      return $delegate;
    }]);

    $provide.decorator('yearpickerDirective', ['$delegate', function ($delegate) {
      //we now get an array of all the datepickerDirectives,
      //and use the first one
      $delegate[0].templateUrl = '/components/calendar/templates/year.html';

      return $delegate;
    }]);

  }

})(angular);