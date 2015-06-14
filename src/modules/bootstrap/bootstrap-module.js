'use strict';

(function (angular) {

  angular
    .module('AS.Bootstrap', [
      'config',
      'log4ng',
      'language',
      'AS.HeaderModule',
      'AS.FooterModule'
    ]);

})(angular);