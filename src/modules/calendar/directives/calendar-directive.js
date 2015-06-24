'use strict';

(function (angular) {
  angular
    .module('as.module.calendar')
    .directive('asCalendar', calendarDirective);

  calendarDirective.$inject = ['$log'];

  function calendarDirective() {
    return {
      restrict: 'E',
      scope: {
        eventData: '='
      },
      templateUrl: '/modules/calendar/templates/calendar.html',
      link: function ($scope) {
        //XXX TODO clean up
        $scope.events = [];
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];


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

        $scope.clear = function () {
          $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function (date, mode) {
          return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
        };

        $scope.toggleMin = function () {
          $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.toggleMin();

        $scope.open = function ($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.today();

        $scope.$watch('eventData', function (newVal) {
          //var data = newVal;

          $scope.events = newVal;
        }, true);
      }
    };
  }

})(angular);