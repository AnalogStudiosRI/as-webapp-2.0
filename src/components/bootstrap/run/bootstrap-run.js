'use strict';

(function (angular) {

  angular
    .module('as.component.bootstrap')
    .run(bootstrapRun);

  bootstrapRun.$inject = ['$rootScope'];

  function bootstrapRun($rootScope) {

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      console.log('omg');
      console.log(event);
      console.log(toState);
    });
  }

})(angular);
