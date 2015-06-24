'use strict';

(function (angular) {

  angular
    .module('as.module.footer')
    .directive('asFooter', footerModuleDirective);

  function footerModuleDirective() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/modules/footer/templates/footer.html',
      link: function ($scope) {
        $scope.year = new Date().getFullYear();
      }
    };
  }

})(angular);