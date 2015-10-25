//CSS related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var loadPluginsConfig = require('./configs/load-plugin-config.json');
var $ = require('gulp-load-plugins')(loadPluginsConfig);
var gulp = require('gulp-param')(require('gulp'), process.argv);
var packageJson = require('../package.json');

var lessLintTasks = $.lazypipe()
  .pipe($.less)
  .pipe($.csslint, 'csslintrc.json')
  .pipe($.csslint.reporter)
  .pipe($.csslint.failReporter);

//convenience task for just linting CSS
gulp.task('less:lint', function () {

  return gulp.src(['./src/**/**/*.less', '!./src/less/as-webapp.less'])
    .pipe(lessLintTasks());

});

//compiles application less, lints the CSS, and generates developer or production CSS based on --production flag
gulp.task('less:build', function (production) {
  var isProductionBuild = production ? true : false;
  var lessFiles = ['./src/less/as-webapp.less', './src/**/**/*.less'];
  var filename = packageJson.name + '-' + packageJson.version + '.min.css';

  return gulp.src(lessFiles)
    .pipe($.less())
    .pipe($.if(isProductionBuild, $.concat(filename)))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'Explorer >= 9']
    }))
    .pipe($.if(isProductionBuild, $.minifyCss()))
    .pipe(gulp.dest('./dest/assets/css'));

});