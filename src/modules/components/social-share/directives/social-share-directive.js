'use strict';

(function (angular) {
  angular
    .module('as.components.socialShare')
    .directive('asSocialShare', asSocialShareDirective);

  asSocialShareDirective.$inject = [];

  function asSocialShareDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/social-share/social-share-directive-template.html'
    };
  }

})(angular);