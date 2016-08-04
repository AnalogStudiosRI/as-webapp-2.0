//https://markgoodyear.com/2015/06/using-es6-with-gulp/

import gulp from 'gulp';
import pipelineHandyman from 'pipeline-handyman';
import sourcemaps from 'gulp-sourcemaps';
import runSequence from 'run-sequence';
import tsCompiler from 'gulp-typescript';
import webserver from 'gulp-webserver';

gulp.task('clean:dest', function(){
  pipelineHandyman.clean('./dest');
});

gulp.task('copy:assets', function() {
  gulp.src('./src/assets/**/**')
    .pipe(gulp.dest('./dest/assets/'));
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
  gulp.src('./src/index.html')
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
    ['copy:config', 'copy:vendor', 'copy:index', 'copy:assets'],
    ['serve']
  );
});

const options = {
  livereload: true,
  open: '/',
  port: 6789,
  proxies: [{
    source: '/api',
    target: 'http://analogstudios.thegreenhouse.io/api'
  }],
  root: './'
};

gulp.task('serve', function () {

  gulp.src(options.root).pipe(webserver(options));

});