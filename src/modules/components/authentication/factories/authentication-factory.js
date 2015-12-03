'use strict';

(function (angular) {

  angular
    .module('as.components.authentication')
    .factory('AuthenticationFactory', AuthenticationFactory);

  AuthenticationFactory.$inject = ['$log', '$http', '$q', 'localStorageService'];

  function AuthenticationFactory($log, $http, $q, localStorageService) {

    return {
      login: function (username, password) {
        var deferred = $q.defer();

        $http.post('/api/login', {
          username: username ? username : '',
          password: password ? password : ''
        }).success(function (response) {
          deferred.resolve(response);
          localStorageService.set(response.data.jwt);
        }).error(function(response) {
          deferred.resolve(response);
          $log.error('error in $http request');
          $log.debug(response);
        });

        return deferred.promise;
      }
    };

  }
}(angular));