'use strict';

(function (angular) {

  angular
    .module('as.views.home', [
      'ui.router',
      'as.components.events',
      'as.components.calendar',
      'as.components.posts',
      'as.components.socialShare'
    ]);

}(angular));