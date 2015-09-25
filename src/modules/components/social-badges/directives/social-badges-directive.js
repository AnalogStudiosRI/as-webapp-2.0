'use strict';

(function (angular) {

  angular
    .module('as.components.socialBadges')
    .directive('asSocialBadges', socialBadgesDirective);

  function socialBadgesDirective() {
    return {
      restrict: 'E',
      templateUrl: '/components/social-badges/templates/social-badges.html',
      link: function () {

      }
    };
  }

})(angular);