'use strict';

(function (angular) {

  angular
    .module('as.components.navigation')
    .directive('asNavigation', navigationDirective);

  function navigationDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/components/navigation/templates/navigation.html',
      link: function () {
      }
    };
  }

})(angular);