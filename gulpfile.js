'use strict';

var loadPluginsConfig = require('./pipelines/configs/load-plugin-config.json');
var $ = require('gulp-load-plugins')(loadPluginsConfig);
var gulp = require('gulp');


//main set of build tasks
var commonBuildTasks = ['js:lint', 'less:lint', 'js:build', 'less:build', 'bower:copy:all', 'copy:assets:all'];

//load custom gulp tasks
$.requireDir('../../pipelines');

//build the application for local development or production deployment
gulp.task('build', function (local, production, show) {

  if (local) {
    $.util.log($.util.colors.green('--local flag set, building application for local development'));

    $.runSequence('clean:dest', commonBuildTasks, ['template:build'], ['serve', 'watch']);

  } else if (production) {
    $.util.log($.util.colors.green('--production flag set, building application for production deployment'));

    if (show) {
      $.util.log($.util.colors.green('--show flag set, will build for production and host on local webserver'));

      $.runSequence('clean:dest', commonBuildTasks, ['template:build'], ['serve']);

    } else {
      //TODO add test coverage back
      //$.runSequence('clean:dest', commonBuildTasks, ['template:build'], ['test:coverage']);
      $.runSequence('clean:dest', commonBuildTasks, ['template:build']);
    }
  }
});