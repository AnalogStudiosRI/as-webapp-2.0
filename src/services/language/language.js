'use strict';

angular.module('language', [

]).constant('LANGUAGE', {
  PAGE: {
    HOME: {
      WELCOME: 'Welcome to the Analog Studios website'
    }
  },
  MESSAGE: {
    UNEXPECTED: 'Sorry, there was an unexpected error.  Please try again or contact the webmaster at XXX'
  }
}).factory('Language', ['LANGUAGE', function (LANGUAGE) {

  return LANGUAGE;
}]);
