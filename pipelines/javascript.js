//application related javascript gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var loadPluginsConfig = require('./configs/load-plugin-config.json');
var $ = require('gulp-load-plugins')(loadPluginsConfig);
var gulp = require('gulp-param')(require('gulp'), process.argv);
var packageJson = require('../package.json');

gulp.task('js:lint', function () {

  return gulp.src(['*.js', './pipelines/*', './src/**/**/*.js'])
    .pipe($.jshint())
    .pipe($.jscs())
    .pipe($.jscsStylish.combineWithHintResults())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));

});

//lints and builds local or production JS based on --production flag
gulp.task('js:build', function (production) {
  var isProductionBuild = production ? true : false;
  var filename = packageJson.name + '-' + packageJson.version + '.min.js';

  return gulp.src(['**/**/*.js', '!**/**/*.spec.js'], {base: './src', cwd: './src'})
    .pipe($.if(isProductionBuild, $.concat(filename)))
    .pipe($.if(isProductionBuild, $.uglify()))
    .pipe(gulp.dest('./dest/assets/js/'));

});