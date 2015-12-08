'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .run(adminRun);

  adminRun.$inject = ['$http', 'AuthenticationFactory'];

  function adminRun($http, AuthenticationFactory) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + AuthenticationFactory.getToken();
  }

})(angular);