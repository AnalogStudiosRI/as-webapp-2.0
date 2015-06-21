/*
 * Grunt related tasks for working testing (unit / e2e)
 */
'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');

  grunt.config.merge({

    //unit testing
    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      tdd: {
        autoWatch: true,
        singleRun: false,
        browsers: ['Chrome'],
        reporters: ['progress'],
        keepalive: true,
        logLevel: 'INFO'
      },
      ci: {
        configFile: 'karma-coverage.conf.js'
      }
    }

  });

  grunt.registerTask('test:ci', ['karma:ci']);
  grunt.registerTask('test:tdd', ['karma:tdd']);

};