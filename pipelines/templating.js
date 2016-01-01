'use strict';

var loadPluginsConfig = require('./configs/load-plugin-config.json');
var $ = require('gulp-load-plugins')(loadPluginsConfig);
var gulp = require('gulp-param')(require('gulp'), process.argv);


var appFiles = [
  'dest/assets/js/**/**/*-module.js',
  'dest/assets/js/**/**/*.js',
  'dest/assets/css/**/*.css',
  '!dest/assets/js/vendor/**/**',
  '!dest/assets/css/vendor/**/**',
  '!dest/assets/elements/vendor/**/**'
];

var vendorFiles = [
  'dest/assets/js/vendor/angular/angular.js',
  'dest/assets/js/vendor/**/**',
  'dest/assets/js/*.min.js',
  'dest/assets/css/vendor/bootstrap/**/*.css',
  'dest/assets/css/vendor/**/*.min.css',
  'dest/assets/css/vendor/*.min.css',
  'dest/assets/css/vendor/textAngular/dist/textAngular.css'
];

function transformFilepath(filepath) {
  var ext = filepath.split('.')[filepath.split('.').length - 1];
  var path = filepath.replace('/dest', '');

  switch (ext){
    case 'js':
      path = '<script src="' + path + '"></script>';
      break;
    case 'css':
      path = '<link rel="stylesheet" href="' + path + '"/>';
      break;
  }

  return path;
}

//needs to be run after all app and vendor JS / CSS has been built into the dest/ directory
//it will then inject those paths into index.html
gulp.task('template:build', function () {

  return gulp.src('./src/layouts/index.html')
    .pipe($.inject(gulp.src(vendorFiles, { read: false }), { name: 'bower', transform: transformFilepath}))
    .pipe($.inject(gulp.src(appFiles, { read: false }), { transform: transformFilepath}))
    .pipe(gulp.dest('./dest'));

});
