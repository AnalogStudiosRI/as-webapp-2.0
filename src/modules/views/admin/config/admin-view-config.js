'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .config(AdminViewConfig);

  AdminViewConfig.$inject = ['$stateProvider'];

  function AdminViewConfig($stateProvider) {
    $stateProvider.state('admin', {
      url: '/admin/',
      templateUrl: '/views/admin/templates/admin-view.html',
      controller: 'AdminViewController',
      controllerAs: 'view'
    });
  }

})(angular);