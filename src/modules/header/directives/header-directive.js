'use strict';

(function (angular) {
  angular
    .module('AS.HeaderModule')
    .directive('header', headerDirective);

  function headerDirective() {
    return {
      restrict: 'E',
      templateUrl: '/modules/header/templates/header.html',
      link: function () {
      }
    };
  }

})(angular);