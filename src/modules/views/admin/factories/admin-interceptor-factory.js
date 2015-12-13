'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .factory('AdminInterceptorFactory', AdminInterceptorFactory);

  AdminInterceptorFactory.$inject = ['$log', '$injector'];

  function AdminInterceptorFactory($log, $injector) {
    var AUTH_METHODS = ['DELETE', 'POST', 'PUT'];

    //XXX TODO handle response with fresh token
    return {

      request: function(config) {
        //injected manually to get around circular dependency problem.
        var AuthFactorory = $injector.get('AuthenticationFactory');

        if (AUTH_METHODS.indexOf(config.method) >= 0 && AuthFactorory.isAuthenticated()) {
          config.headers.Authorization = 'Bearer ' + AuthFactorory.getToken();
        }

        return config;
      }

    };
  }
}(angular));