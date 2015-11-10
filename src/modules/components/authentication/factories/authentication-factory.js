'use strict';

(function (angular) {

  angular
    .module('as.components.authentication')
    .factory('AuthenticationFactory', AuthenticationFactory);

  AuthenticationFactory.$inject = ['$log', '$http', '$q'];

  function AuthenticationFactory($log, $http, $q) {

    return {
      login: function (username, password) {

        if (angular.isString(username) && angular.isString(password)) {
          console.log('here???');
          var deferred = $q.defer();

          $http.post('/api/login', {
            username: username,
            password: password
          }).success(function (data) {
            deferred.resolve(data);
          }).error(function(data) {
            deferred.reject('error in $http request');
            $log.error('error');
            $log.debug(data);
          });

          return deferred.promise;
        } else {
          $log.debug('exception');
          throw new Error('Invalid Argument Exception');
        }
      }
    };

  }
}(angular));