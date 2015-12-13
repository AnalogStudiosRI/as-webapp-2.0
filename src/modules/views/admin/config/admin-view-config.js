'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .config(AdminViewConfig);

  AdminViewConfig.$inject = ['$stateProvider', '$httpProvider'];

  function AdminViewConfig($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('AdminInterceptorFactory');

    $stateProvider
      .state('admin', {
        url: '/admin/',
        templateUrl: '/views/admin/templates/admin-view.html',
        controller: 'AdminViewController',
        controllerAs: 'view'
      })
      .state('admin.events', {
        templateUrl: '/views/admin/templates/admin-view-events.html',
        controller: 'AdminViewEventsController',
        controllerAs: 'view'
      });
  }

})(angular);