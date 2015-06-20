'use strict';

(function () {

  angular
    .module('as.page.events')
    .controller('EventsPageController', eventsPageController);

  eventsPageController.$inject = ['$scope', '$log', 'EventsFactory'];

  function eventsPageController($scope, $log, EventsFactory) {

    //private members

    //private methods
    function getEvents() {
      EventsFactory.query(function (response) {

        setEvents(response);
      }, function (response) {
        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    function setEvents(data) {
      //var events = [];
      _.forEach(data, function (n, key) {
        $log.debug(n.createdTime);
        var eventDate = new Date().setTime(n.createdTime);
        $log.debug(eventDate);
        var event = {
          date: eventDate.getDate(),
          status: 'partially'
        };

        //event.date = new Date();
        //event.date.setDate(event.date.getDate());
        //event.status = 'partial';

        //$log.debug(event);
        $scope.events.push(event);
        $log.debug($scope.events[key]);
        $scope.today();

        //var tomorrow = new Date();
        //tomorrow.setDate(tomorrow.getDate() + 1);
        //
        //var afterTomorrow = new Date();
        //afterTomorrow.setDate(tomorrow.getDate() + 2);
        //
        //$scope.events = [{
        //  date: tomorrow,
        //  status: 'full'
        //}, {
        //  date: afterTomorrow,
        //  status: 'partially'
        //}];
        //
        //$log.debug($scope.events);
        //$log.debug('*************');
      });
    }

    //public members
    $scope.events = [];
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    //var tomorrow = new Date();
    //tomorrow.setDate(tomorrow.getDate() + 1);
    //
    //var afterTomorrow = new Date();
    //afterTomorrow.setDate(tomorrow.getDate() + 2);

    //$scope.events = [{
    //  date: tomorrow,
    //  status: 'full'
    //}, {
    //  date: afterTomorrow,
    //  status: 'partially'
    //}];


    $scope.getDayClass = function (date, mode) {
      $log.info('???');
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

    $scope.init = function () {
      $log.info('Enter AS.EventsPage.init');

      getEvents();
    };

    $scope.init();
  }

}(angular));