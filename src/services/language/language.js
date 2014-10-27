angular.module('language', [

]).factory('Language', [

  function () {
    'use strict';

    var Language = {
      ERROR: {
        UNEXPECTED: 'Sorry, there was an unexpected error.  Please try again or contact the webmaster at XXX'
      }
    };

    return Language;
  }
]);
