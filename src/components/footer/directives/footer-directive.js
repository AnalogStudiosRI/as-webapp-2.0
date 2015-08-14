'use strict';

(function (angular) {

  angular
    .module('as.components.footer')
    .directive('asFooter', footerModuleDirective);

  function footerModuleDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/components/footer/templates/footer.html',
      link: function ($scope) {
        $scope.year = new Date().getFullYear();
      }
    };
  }

})(angular);