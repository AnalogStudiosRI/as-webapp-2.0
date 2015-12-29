'use strict';

(function (angular) {

  angular
    .module('as.bootstrap', [
      'ui.bootstrap',
      'ui.router',
      'as.components.analytics',
      'as.components.navigation',
      'as.components.footer',
      'as.components.header',
      'as.components.language',
      'as.views.admin',
      'as.views.events',
      'as.views.home'
    ]);

})(angular);