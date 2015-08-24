'use strict';

(function (angular) {

  angular
    .module('as.components.bootstrap', [
      'ui.router',
      'as.components.footer',
      'as.components.header',
      'as.components.language',
      'as.views.admin',
      'as.views.events',
      'as.views.home'
    ]);

})(angular);