/*
 * Grunt related tasks for working testing (unit / e2e)
 */
'use strict';

var BowerService = require('../grunt-services/bower-service.js');
var _ = require('lodash');

module.exports = function (grunt) {

  grunt.config.merge({
    //unit testing
    karma: {
      options: {
        configFile: 'karma.conf.js',
        files: _.map(BowerService.getAssets('dev').js, function (file) {
          return 'bower_components/' + file;
        }).concat([
          'bower_components/angular-mocks/angular-mocks.js',
          'bower_components/ngui/dist/**/*.js',
          'src/pages/**/*.js',
          'src/features/**/*.js',
          'src/services/**/*.js'
        ])
      },
      dev: {
        autoWatch: true,
        singleRun: false,
        browsers: [ 'PhantomJS' ],
        reporters: [ 'progress' ],
        keepalive: true
      },
      ci: {
        keepalive: true,
        autoWatch: false,
        singleRun: true,
        browsers: [ 'PhantomJS' ],
        reporters: [ 'junit', 'progress' ],
        reportSlowerThan: 1000,
        junitReporter: {
          outputFile: 'reports/test-results.xml'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-karma');

};