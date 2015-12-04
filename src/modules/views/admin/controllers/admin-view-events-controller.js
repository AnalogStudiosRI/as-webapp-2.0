'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewEventsController', adminViewEventsController);

  adminViewEventsController.$inject = ['$log'];

  function adminViewEventsController($log) {
    $log.info('ENTER as.views.admin.events');
    /*jshint validthis:true */
    //var vm = this;
  }

}(angular));