//https://markgoodyear.com/2015/06/using-es6-with-gulp/
'use strict';

import gulp from 'gulp';
import pipelineHandyman from 'pipeline-handyman';
import sourcemaps from 'gulp-sourcemaps';
import runSequence from 'run-sequence';
import tsCompiler from 'gulp-typescript';
import webserver from 'gulp-webserver';

gulp.task('clean:dest', function(){
  pipelineHandyman.clean('./dest');
});

gulp.task('clean:dest', function(){
  pipelineHandyman.clean('./dest');
});


gulp.task('copy:vendor', function() {
  gulp.src('./jspm_packages/**/**')
    .pipe(gulp.dest('./dest/jspm_packages'));
});

gulp.task('copy:config', function() {
  gulp.src('./config.js')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('copy:index', function() {
  gulp.src('./src/layouts/index.html')
    .pipe(gulp.dest('./dest/'));
});

gulp.task('compile:ts', function () {
  var tsProject = tsCompiler.createProject('tsconfig.json');

  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsCompiler(tsProject))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dest/'));
});

gulp.task('build:develop', ['clean:dest'], function() {
  runSequence(
    ['compile:ts'],
    ['copy:config', 'copy:vendor', 'copy:index'],
    ['serve']
  );
});

const options = {
  //directoryListing: true,
  //livereload: true,   //XXX TODO need to figure out why performance drains when using this with watch + inject
  open: '/',
  port: 6789,
  proxies: [{
    source: '/api',
    target: 'http://analogstudios.thegreenhouse.io/api'
  }],
  root: './dest/'
};

gulp.task('serve', function () {

  gulp.src(options.root).pipe(webserver(options));

});

// 'use strict';
//
// var loadPluginsConfig = require('./pipelines/configs/load-plugin-config.json');
// var $ = require('gulp-load-plugins')(loadPluginsConfig);
// var gulp = require('gulp');
//
//
// //main set of build tasks
// var commonBuildTasks = ['js:lint', 'less:lint', 'js:build', 'less:build', 'bower:copy:all', 'copy:assets:all'];
//
// //load custom gulp tasks
// $.requireDir('../../pipelines');
//
// //build the application for local development or production deployment
// gulp.task('build', function (local, production, show) {
//
//   if (local) {
//     $.util.log($.util.colors.green('--local flag set, building application for local development'));
//
//     $.runSequence('clean:dest', commonBuildTasks, ['template:build'], ['serve', 'watch']);
//
//   } else if (production) {
//     $.util.log($.util.colors.green('--production flag set, building application for production deployment'));
//
//     if (show) {
//       $.util.log($.util.colors.green('--show flag set, will build for production and host on local webserver'));
//
//       $.runSequence('clean:dest', commonBuildTasks, ['template:build'], ['serve']);
//
//     } else {
//       //TODO add test coverage back
//       //$.runSequence('clean:dest', commonBuildTasks, ['template:build'], ['test:coverage']);
//       $.runSequence('clean:dest', commonBuildTasks, ['template:build']);
//     }
//   }
// });

// "devDependencies": {
//   "aws-sdk": "2.2.28",
//     "bower": "1.7.9",
//     "del": "1.2.0",
//     "glob": "6.0.3",
//     "gulp": "3.9.0",
//     "gulp-autoprefixer": "2.3.1",
//     "gulp-compile-handlebars": "0.5.0",
//     "gulp-concat": "2.5.2",
//     "gulp-csslint": "0.1.5",
//     "gulp-if": "1.2.5",
//     "gulp-ignore": "1.2.1",
//     "gulp-inject": "1.3.1",
//     "gulp-jscs": "1.6.0",
//     "gulp-jscs-stylish": "1.1.0",
//     "gulp-jshint": "1.10.0",
//     "gulp-less": "3.0.3",
//     "gulp-less-sourcemap": "1.4.2",
//     "gulp-load-plugins": "1.0.0-rc.1",
//     "gulp-minify-css": "1.1.6",
//     "gulp-param": "0.6.3",
//     "gulp-rename": "1.2.2",
//     "gulp-uglify": "1.2.0",
//     "gulp-util": "3.0.5",
//     "gulp-webserver": "0.9.1",
//     "jshint-stylish": "2.0.0",
//     "karma": "0.12.37",
//     "karma-chrome-launcher": "0.1.1",
//     "karma-coverage": "0.4.2",
//     "karma-html2js-preprocessor": "0.1.0",
//     "karma-jasmine": "0.2.1",
//     "karma-junit-reporter": "0.2.1",
//     "karma-ng-html2js-preprocessor": "0.1.0",
//     "karma-phantomjs-launcher": "0.1.1",
//     "lazypipe": "0.2.3",
//     "lodash": "2.4.1",
//     "merge-stream": "0.1.7",
//     "phantomjs": "1.9.18",
//     "require-dir": "0.3.0",
//     "run-sequence": "1.1.0",
//     "wiredep": "2.2.2",
//     "yargs": "3.10.0"
// }