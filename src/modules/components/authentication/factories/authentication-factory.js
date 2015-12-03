'use strict';

(function (angular) {

  angular
    .module('as.components.authentication')
    .factory('AuthenticationFactory', AuthenticationFactory);

  AuthenticationFactory.$inject = ['$log', '$http', '$q', 'localStorageService'];

  function AuthenticationFactory($log, $http, $q, localStorageService) {
    var JWT_KEY = 'token';

    return {
      login: function (username, password) {
        var deferred = $q.defer();

        $http.post('/api/login', {
          username: username ? username : '',
          password: password ? password : ''
        }).success(function (response) {
          deferred.resolve(response);
          localStorageService.set(JWT_KEY, response.data.jwt);
        }).error(function(response) {
          deferred.reject(response);
          $log.error('error in $http request');
          $log.debug(response);
        });

        return deferred.promise;
      },

      logout: function () {
        return localStorageService.remove(JWT_KEY);
      },

      isAuthenticated: function () {
        return localStorageService.get(JWT_KEY);
      }
    };

  }
}(angular));