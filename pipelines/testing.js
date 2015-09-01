'use strict';

var gulp = require('gulp');
var karma = require('karma').server;

//run tests and keep runner open, for doing test driven development
gulp.task('test:tdd', function () {

  karma.start({
    configFile: __dirname + '/../karma.conf.js',
    autoWatch: true,
    singleRun: false,
    browsers: ['Chrome']
  });

});

//will run all tests and generate coverage output, primarily for Jenkins
gulp.task('test:ci', function () {

  return karma.start({
    configFile: __dirname + '/../karma-coverage.conf.js',
    browsers: ['PhantomJS']
  });

});