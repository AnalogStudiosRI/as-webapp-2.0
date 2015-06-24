'use strict';

(function (angular) {

  angular
    .module('as.module.socialBadges')
    .directive('asSocialBadges', socialBadgesDirective);

  function socialBadgesDirective() {
    return {
      restrict: 'E',
      templateUrl: '/modules/social-badges/templates/social-badges.html',
      link: function () {

      }
    };
  }

})(angular);