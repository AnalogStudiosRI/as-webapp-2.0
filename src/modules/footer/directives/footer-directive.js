'use strict';

(function (angular) {

  angular
    .module('AS.FooterModule')
    .directive('asFooter', footerModuleDirective);

  function footerModuleDirective() {
    return {
      restrict: 'E',
      templateUrl: '/modules/footer/templates/footer.html',
      link: function ($scope) {
        $scope.year = new Date().getFullYear();
      }
    };
  }

})(angular);