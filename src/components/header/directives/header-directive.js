'use strict';

(function (angular) {

  angular
    .module('as.components.header')
    .directive('asHeader', headerDirective);

  function headerDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/components/header/templates/header.html',
      link: function () {
      }
    };
  }

})(angular);