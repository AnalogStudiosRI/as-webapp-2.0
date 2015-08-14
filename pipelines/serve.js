//start a local web server, also supports proxying for API requests
//directory context is the cwd of gulpfile.js (/webapp/)
'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

var options = {
  //directoryListing: true,
  //livereload: true,   //XXX TODO need to figure out why performance drains when using this with watch + inject
  open: '/',
  host: 'local.analogstudios.thegreenhouse.io',
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