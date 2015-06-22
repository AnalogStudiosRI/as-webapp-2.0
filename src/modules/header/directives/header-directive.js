'use strict';

(function (angular) {
  angular
    .module('as.module.header')
    .directive('asHeader', headerDirective);

  function headerDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/modules/header/templates/header.html',
      link: function () {
      }
    };
  }

})(angular);