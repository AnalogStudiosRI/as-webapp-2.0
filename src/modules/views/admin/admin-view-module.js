'use strict';

(function (angular) {

  angular
    .module('as.views.admin', [
      'angularSpinner',
      'textAngular',
      'as.components.authentication',
      'as.components.events',
      'as.components.pubsub'
    ]);

}(angular));
