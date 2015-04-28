angular.module('header',
  [ 'socialBadges' ]
).directive('header', function () {
  'use strict';

  return {
    restrict: 'E',
    template:
      '<div class="row">' +
        '<div class="col-md-2">' +
        '</div>' +
        '<div class="col-md-3">' +
          '<h2>Analog Studios</h2>' +
        '</div>' +
        '<div class="col-md-5">' +
          '<nav>' +
            '<ul>' +
              '<li><a class="link" href="/home/">the studio</a></li>' +
              '<li><a class="link" href="/products/">artists</a></li>' +
              '<li><a class="link" href="/events/">events</a></li>' +
              '<li><a class="link" href="/media/">media</a></li>' +
              '<li><a class="link" href="/contact/">contact</a></li>' +
            '</ul>' +
          '</nav>' +
        '</div>' +
        '<div class="col-md-2">' +
          '<social-badges></social-badges>' +
        '</div>' +
      '</div>',
    link: function () {

    }
  };

});