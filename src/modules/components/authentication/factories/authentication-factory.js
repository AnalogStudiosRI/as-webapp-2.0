'use strict';

(function (angular) {

  angular
    .module('as.components.authentication')
    .factory('AuthenticationFactory', AuthenticationFactory);

  AuthenticationFactory.$inject = ['$log', '$http', '$q', 'localStorageService', 'jwtHelper'];

  function AuthenticationFactory($log, $http, $q, localStorageService, jwtHelper) {
    var JWT_KEY = 'token';

    return {

      getToken: function () {
        return localStorageService.get(JWT_KEY);
      },

      isAuthenticated: function () {
        var token = localStorageService.get(JWT_KEY) || '';
        var isValid = token && angular.isString(token) && token !== '' ? jwtHelper.isTokenExpired(token) : false;

        return isValid;
      },

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
      }

    };

  }
}(angular));