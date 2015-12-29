'use strict';

(function (angular) {

  angular
    .module('as.views.home')
    .controller('HomeViewController', homeViewContoller);

  homeViewContoller.$inject = ['$log', 'LanguageFactory', 'EventsFactory'];

  function homeViewContoller($log, LanguageFactory, EventsFactory) {
    /*jshint validthis:true */
    var vm = this;
    var LANG = LanguageFactory.get();

    $scope.events = [];

    function parseEventsResponse(response) {
      var events = [];

      _.forEach(response, function (n) {
        var event = n;
        var time = parseInt(event.startTime * 1000);
        var eventDate = new Date(time);

        event.date = eventDate;

        events.push(event);
      });

      return events;
    }

    //public members
    vm.welcomeText = LANG.PAGE.HOME.WELCOME;

    //public methods
    vm.init = function () {
      $log.info('Enter AS.HomeView.init');
      EventsFactory.query(function (data) {
        $log.debug('!!!!!!');
        $log.debug(data);
        $scope.events = parseEventsResponse(data);
      }, function() {
        $log.error('omg');
      });
    };

    //init
    vm.init();

    vm.eventClick = function (data) {
      $log.debug(data);
    };
  }

}(angular));