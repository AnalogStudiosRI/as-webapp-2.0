//filesystem related gulp tasks (clean, copy, watch)
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var loadPluginsConfig = require('./configs/load-plugin-config.json');
var $ = require('gulp-load-plugins')(loadPluginsConfig);
var gulp = require('gulp');

gulp.task('clean:dest', function () {

  //make sure del runs synchronously
  return $.del.sync([
    './dest/**'
  ]);

});

gulp.task('copy:templates', function() {

  return gulp.src(['src/modules/**/*.html', '!./src/layouts/*.html'])
    .pipe(gulp.dest('./dest/'));

});

gulp.task('copy:assets:images', function() {

  return gulp.src(['src/assets/images/*', '!src/assets/images/favicon.png'])
    .pipe(gulp.dest('./dest/assets/images'));

});

gulp.task('copy:assets:images:favicon', function() {

  return gulp.src(['src/assets/images/favicon.png'])
    .pipe(gulp.dest('./dest/'));

});


gulp.task('copy:assets:all', ['copy:assets:images', 'copy:assets:images:favicon', 'copy:templates']);

//XXX TODO scope watchers to just their tasks
gulp.task('watch', function () {

  gulp.watch(['./src/**/**/*'], function () {

    $.runSequence(
      ['js:lint', 'less:lint', 'js:build', 'less:build', 'copy:assets:all', 'bower:copy:all'],
      ['template:build']
    );

  });
});