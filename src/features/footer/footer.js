angular.module('footer',
  []
).directive('footer', function () {
  'use strict';

  return {
    restrict: 'E',
    template:
      '<div class="row">' +
        '<div class="col-md-12">' +
          '<p>&copy; 2007 - [[year]]</p>' +
        '</div>' +
      '</div>',
    link: function ($scope) {
      $scope.year = new Date().getFullYear();
    }
  };

});