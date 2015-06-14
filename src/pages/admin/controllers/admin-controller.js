'use strict';

(function (angular) {

  angular
    .module('AS.AdminPage')
    .controller('AdminPageController', adminPageController);

  adminPageController.$inject = ['$scope', 'Log4ng'];

  function adminPageController($scope, Log4ng) {
    var AdminCtrl = {};

    AdminCtrl.init = function () {
      Log4ng.info('ENTER AS.AdminPage.init');
    };

    $scope.AdminCtrl = AdminCtrl;

    AdminCtrl.init();
  }

}(angular));