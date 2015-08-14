'use strict';

module.exports = function (config) {

  var conf = {
    // base path, that will be used to resolve files and exclude
    basePath: '.',

    // frameworks to use
    frameworks: ['jasmine'],

    preprocessors: {
      'src/**/*.html': ['ng-html2js'],
      'src/**/**/*.js': ['coverage']
    },

    ngHtml2JsPreprocessor: {
      // setting this option will create only a single module that contains templates
      // from all the files, so you can load them all with module('foo')
      moduleName: 'templates',
      stripPrefix: 'src'
    },

    // list of files / patterns to load in the browser
    files: [
      './bower_components/angular/angular.js',
      './bower_components/angular-resource/angular-resource.js',
      './bower_components/angular-mocks/angular-mocks.js',
      './bower_components/angular-bootstrap/ui-bootstrap.js',
      './src/**/*-module.js',  //load all modules first
      './src/**/*.js',
      './src/**/*.html'
    ],

    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress', 'junit'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: 'ERROR',


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    keepalive: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
    reportSlowerThan: 1000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    junitReporter: {
      outputFile: 'reports/test-results/test-results.xml'
    }
  };

  config.set(conf);

  return conf;
};