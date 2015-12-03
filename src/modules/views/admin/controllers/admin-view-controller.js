'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewController', adminViewController);

  adminViewController.$inject = ['$log'];

  function adminViewController($log) {
    $log.info('ENTER as.views.admin');
    /*jshint validthis:true */
    var vm = this;

    vm.text = 'This is the Admin page';
  }

}(angular));