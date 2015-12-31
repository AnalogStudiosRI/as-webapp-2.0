'use strict';

(function (angular) {
  angular
    .module('as.components.socialShare')
    .directive('asSocialShare', asSocialShareDirective);

  asSocialShareDirective.$inject = ['$log', '$location'];

  function asSocialShareDirective($log, $location) {

    return {
      restrict: 'E',
      templateUrl: '/components/social-share/social-share-directive-template.html',
      link: function (scope) {
        scope.url = $location.absUrl();
      }
    };
  }

})(angular);