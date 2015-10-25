//bower components related gulp tasks for
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var loadPluginsConfig = require('./configs/load-plugin-config.json');
var $ = require('gulp-load-plugins')(loadPluginsConfig);
var packageJson = require('../package.json');
var gulp = require('gulp-param')(require('gulp'), process.argv);
var filename = packageJson.name + '-' + packageJson.version + '-vendor.min.';

gulp.task('bower:copy:fonts', function () {

  return gulp.src(['./bower_components/bootstrap/dist/fonts/*', './bower_components/font-awesome/fonts/*'])
    .pipe(gulp.dest('./dest/assets/fonts/'));
});

gulp.task('bower:copy:css', function (production) {
  var isProductionBuild = production ? true : false;

  return gulp.src($.wiredep().css, {base: './bower_components', cwd: './bower_components'})
    .pipe($.if(isProductionBuild, $.concat(filename + 'css')))
    .pipe($.if(isProductionBuild, $.minifyCss()))
    .pipe(gulp.dest('./dest/assets/css/vendor/'));
});

gulp.task('bower:copy:js', function (production) {
  var isProductionBuild = production ? true : false;

  return gulp.src($.wiredep().js, {base: './bower_components', cwd: './bower_components'})
    .pipe($.if(isProductionBuild, $.concat(filename + 'js')))
    .pipe($.if(isProductionBuild, $.uglify()))
    .pipe(gulp.dest('./dest/assets/js/vendor/'));
});

gulp.task('bower:copy:all', ['bower:copy:css', 'bower:copy:js', 'bower:copy:fonts']);