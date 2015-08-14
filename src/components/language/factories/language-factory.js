'use strict';

(function (angular) {

  var language = {
    PAGE: {
      HOME: {
        WELCOME: 'Welcome to the Analog Studios website'
      }
    },
    MESSAGE: {
      UNEXPECTED: 'Sorry, there was an unexpected error.  Please try again or contact the webmaster at XXX'
    }
  };

  angular
    .module('as.component.language')
    .constant('LANGUAGE', language)
    .factory('LanguageFactory', languageFactory);

  languageFactory.$inject = ['LANGUAGE'];

  function languageFactory(LANGUAGE) {

    return {
      get: function () {
        return LANGUAGE;
      }
    };
  }

}(angular));