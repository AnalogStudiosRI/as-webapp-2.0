'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .controller('AdminViewController', adminViewController);

  adminViewController.$inject = ['$scope', '$log'];

  function adminViewController($scope, $log) {
    var AdminCtrl = {};

    AdminCtrl.init = function () {
      $log.info('ENTER AS.AdminPage.init');
    };

    $scope.AdminCtrl = AdminCtrl;

    AdminCtrl.init();
  }

}(angular));