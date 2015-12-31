'use strict';

(function (angular) {
  angular
    .module('as.components.calendar')
    .directive('asCalendar', calendarDirective);

  calendarDirective.$inject = ['$log'];

  function calendarDirective($log) {
    return {
      restrict: 'E',
      scope: {
        eventData: '=',
        eventClick: '='
      },
      templateUrl: '/components/calendar/templates/calendar.html',
      link: function ($scope) {
        $scope.events = [];

        //private methods
        function matchDateToEvent(date) {

          for (var i = 0, l = $scope.events.length; i < l; i += 1) {
            var event = $scope.events[i];
            var eventDate = new Date(event.startTime * 1000);
            var eventFlat = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
            var dateFlat =  new Date(date.getFullYear(), date.getMonth(), date.getDate());

            if (eventFlat.getTime() === dateFlat.getTime()) {
              $scope.callback(event);
              return;
            }
          }
        }

        //public members
        $scope.callback = $scope.eventClick || function () {
          $log.warn('No callback function provided');
        };

        $scope.getDayClass = function (date) {
          var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

          //check if day has an event
          for (var i = 0; i < $scope.events.length; i += 1) {
            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

            if (dayToCheck === currentDay) {
              return 'day-event';
            }
          }

          //else return based on if date being checked in the current month
          return date.getMonth() === $scope.dt.getMonth() ? 'day-on' : 'day-off';
        };

        $scope.today = function () {
          $scope.dt = new Date();
        };

        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        //watch for event data being passed on
        $scope.$watch('eventData', function (newVal, oldVal) {
          if (newVal !== oldVal) {
            $scope.events = newVal;
            $scope.$broadcast('refreshDatepickers');  //custom refresh functionality, see calendar-directive.js
          }
        }, true);

        //watch for selections on the calendar
        $scope.$watch('dt', function (newVal) {
          matchDateToEvent(newVal);
        }, true);

        $scope.today();
      }
    };
  }

})(angular);