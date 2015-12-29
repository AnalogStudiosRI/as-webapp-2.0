'use strict';

(function (angular) {

  angular
    .module('as.views.admin')
    .factory('AdminInterceptorFactory', AdminInterceptorFactory);

  AdminInterceptorFactory.$inject = ['$log', '$injector', 'PubSubFactory'];

  function AdminInterceptorFactory($log, $injector, PubSubFactory) {
    var AUTH_METHODS = ['DELETE', 'POST', 'PUT'];

    PubSubFactory.register('RESPONSE_UNAUTH');
    PubSubFactory.register('RESPONSE_BAD_REQUEST');

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

        switch (response.status) {
          case 400:
            PubSubFactory.publish('RESPONSE_BAD_REQUEST', response);
            break;
          case 401:
            PubSubFactory.publish('RESPONSE_UNAUTH', response);
            break;
          default:
            return response;
        }

        //return response;
      }

    };
  }
}(angular));