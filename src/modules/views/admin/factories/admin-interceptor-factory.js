'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .factory('AdminInterceptorFactory', AdminInterceptorFactory);

  AdminInterceptorFactory.$inject = ['$log', '$injector', 'PubSubFactory'];

  function AdminInterceptorFactory($log, $injector, PubSubFactory) {
    var AUTH_METHODS = ['DELETE', 'POST', 'PUT'];

    $log.debug('pub sub register');
    PubSubFactory.register('RESPONSE_UNAUTH');

    //XXX TODO handle response with fresh token
    return {

      request: function(config) {
        //injected manually to get around circular dependency problem.
        var AuthFactorory = $injector.get('AuthenticationFactory');

        if (AUTH_METHODS.indexOf(config.method) >= 0 && AuthFactorory.isAuthenticated()) {
          config.headers.Authorization = 'Bearer ' + AuthFactorory.getToken();
        }

        return config;
      },

      responseError: function(response) {

        if (response.status === 401) {
          PubSubFactory.publish('RESPONSE_UNAUTH', response);
        }

        return response;
      }

    };
  }
}(angular));