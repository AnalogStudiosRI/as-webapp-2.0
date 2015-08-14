'use strict';

(function (angular) {

  angular
    .module('as.components.bootstrap')
    .run(bootstrapRun);

  bootstrapRun.$inject = ['$rootScope', '$log'];

  function bootstrapRun($rootScope, $log) {
    $log.debug('hello?');

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      $log.log('omg');
      $log.log(event);
      $log.log(toState);
    });

    $rootScope.$on('$stateChangeError', function(event, toState) {
      $log.log('omg');
      $log.log(event);
      $log.log(toState);
    });
  }

})(angular);
