'use strict';

(function (angular) {

  angular
    .module('AS.SocialBadgesModule')
    .directive('socialBadges', socialBadgesDirective);

  function socialBadgesDirective() {
    return {
      restrict: 'E',
      templateUrl: '/modules/social-badges/templates/social-badges.html',
      link: function () {

      }
    };
  }

})(angular);