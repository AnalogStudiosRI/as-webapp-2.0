'use strict';

(function () {

  angular
    .module('as.page.events')
    .controller('EventsPageController', eventsPageController);

  eventsPageController.$inject = ['$scope', '$log', 'EventsFactory'];

  function eventsPageController($scope, $log, EventsFactory) {

    //  function setEvents(data) {
    //    //var events = [];
    //    _.forEach(data, function (n, key) {
    //      //$log.debug(n.createdTime);
    //      //var eventDate = new Date().setTime(n.createdTime);
    //      //$log.debug(eventDate);
    //      //var event = {
    //      //  date: eventDate.getDate(),
    //      //  status: 'partially'
    //      //};
    //
    //      //event.date = new Date();
    //      //event.date.setDate(event.date.getDate());
    //      //event.status = 'partial';
    //
    //      //$log.debug(event);
    //      $scope.events.push(event);
    //      $log.debug($scope.events[key]);
    //      $scope.today();
    //
    //      var tomorrow = new Date();
    //      tomorrow.setDate(tomorrow.getDate() + 1);
    //
    //      var afterTomorrow = new Date();
    //      afterTomorrow.setDate(tomorrow.getDate() + 2);
    //
    //      $scope.events = [{
    //        date: tomorrow,
    //        status: 'full'
    //      }, {
    //        date: afterTomorrow,
    //        status: 'partially'
    //      }];
    //
    //      $log.debug($scope.events);
    //      $log.debug('*************');
    //    });
    //  }
    //
    //public members

    //private members
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);


    $scope.events = [{
      date: tomorrow,
      status: 'full'
    }, {
      date: afterTomorrow,
      status: 'partially'
    }];

    //private methods
    function getEvents() {
      EventsFactory.query(function (response) {
        $log.info(response);
        //setEvents(response);
      }, function (response) {
        $log.error('getEvents failure');
        $log.error(response);
      });
    }

    $scope.init = function () {
      $log.info('Enter AS.EventsPage.init');

      getEvents();
    };

    $scope.init();
  }

}(angular));