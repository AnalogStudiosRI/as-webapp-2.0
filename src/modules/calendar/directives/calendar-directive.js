'use strict';

(function (angular) {
  angular
    .module('as.module.calendar')
    .directive('asCalendar', calendarDirective);

  calendarDirective.$inject = ['$log'];

  function calendarDirective($log) {
    return {
      restrict: 'E',
      scope: {
        eventData: '=',
        eventClick: '='
      },
      templateUrl: '/modules/calendar/templates/calendar.html',
      link: function ($scope) {
        //XXX TODO clean up
        $scope.events = [];
        //$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        //$scope.format = $scope.formats[0];

        //private methods
        function matchEvent(date) {
          $log.info('matchEvent');

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

        $scope.callback = $scope.eventClick || function () {
          $log.warn('No callback function provided');
        };

        $scope.getDayClass = function (date, mode) {
          if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i += 1) {
              var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

              if (dayToCheck === currentDay) {
                return $scope.events[i].status;
              }
            }
          }

          return '';
        };

        //public members
        $scope.today = function () {
          $scope.dt = new Date();
        };

        //$scope.clear = function () {
        //  $scope.dt = null;
        //};

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
          return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        //$scope.toggleMin = function () {
        //  $scope.minDate = $scope.minDate ? null : new Date();
        //};
        //
        //$scope.toggleMin();

        //$scope.open = function ($event) {
        //  $event.preventDefault();
        //  $event.stopPropagation();
        //
        //  $scope.opened = true;
        //};

        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.today();

        $scope.$watch('eventData', function (newVal) {
          $scope.events = newVal;
        }, true);

        $scope.$watch('dt', function (newVal) {
          $log.debug('dt changed');
          matchEvent(newVal);
        }, true);

      }
    };
  }

})(angular);