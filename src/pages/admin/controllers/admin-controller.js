'use strict';

(function (angular) {

  angular
    .module('as.page.admin')
    .controller('AdminPageController', adminPageController);

  adminPageController.$inject = ['$scope', '$log'];

  function adminPageController($scope, $log) {
    var AdminCtrl = {};

    AdminCtrl.init = function () {
      $log.info('ENTER AS.AdminPage.init');
    };

    $scope.AdminCtrl = AdminCtrl;

    AdminCtrl.init();
  }

}(angular));