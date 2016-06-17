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
    ['copy:config', 'copy:vendor', 'copy:index', 'copy:assets'],
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
// 
// var AWS = require('aws-sdk');
// var fs = require('fs');
// var glob = require('glob');
// var gulp = require('gulp');
//
// AWS.config.region = 'us-west-2';
//
// function getContentType(extension) {
//   var contentType = '';
//
//   switch (extension) {
//     case '.eot':
//       contentType = 'application/vnd.ms-fontobject';
//       break;
//     case '.jpg':
//       contentType = 'image/jpeg';
//       break;
//     case '.js':
//       contentType = 'application/javascript';
//       break;
//     case '.otf':
//       contentType = 'application/x-font-opentype';
//       break;
//     case '.png':
//       contentType = 'image/png';
//       break;
//     case '.svg':
//       contentType = 'image/svg+xml';
//       break;
//     case '.ttf':
//       contentType = 'application/x-font-ttf';
//       break;
//     case '.woff':
//       contentType = 'application/font-woff';
//       break;
//     case '.woff2':
//       contentType = 'application/font-woff2';
//       break;
//     default:
//       contentType = 'text/' + extension.replace('.', '');
//       break;
//   }
//
//   return contentType;
// }
//
// function httpUploadProgress(evt) {
//   console.log(evt);
// }
//
// function httpUploadSend(err, data) {
//   console.log(err, data);
// }
//
//
// gulp.task('s3:deploy', function() {
//   s3.listBuckets(function(err, data) {
//    if (err) {
//      console.log("Error:", err);
//    } else {
//      for (var index in data.Buckets) {
//        var bucket = data.Buckets[index];
//        console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
//      }
//    }
//   });
//
//   // options is optional
//   glob('dest/**/*', {}, function (er, files) {
//     for (var i = 0, l = files.length; i < l; i += 1) {
//       var filename = files[i];
//       var s3filename = filename.replace('dest/', '');
//
//       //upload only files
//       //XXX hack to get around odd spin.js build oddity
//       //XXX would not be an issue if AS-219, AS-225
//       if (filename.indexOf('.') > 0 && filename !== 'dest/assets/js/vendor/spin.js') {
//         var extension = filename.slice(filename.lastIndexOf('.'));
//         var contentType = getContentType(extension);
//         var body = fs.createReadStream(filename); //.pipe(zlib.createGzip());
//
//         var s3 = new AWS.S3({
//           params: {
//             Bucket: 'static.analogstudios.net',
//             Key: s3filename,
//             ContentType: contentType
//           }
//         });
//
//         s3.upload({Body: body}).on('httpUploadProgress', httpUploadProgress).send(httpUploadSend);
//       }
//     }
//   });
//
// }
//
// );
//application related javascript gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
// 'use strict';
//
// var loadPluginsConfig = require('./configs/load-plugin-config.json');
// var $ = require('gulp-load-plugins')(loadPluginsConfig);
// var gulp = require('gulp-param')(require('gulp'), process.argv);
// var packageJson = require('../package.json');
//
// gulp.task('js:lint', function () {
//
//   return gulp.src(['*.js', './pipelines/*', './src/**/**/*.js'])
//     .pipe($.jshint())
//     .pipe($.jscs())
//     .pipe($.jscsStylish.combineWithHintResults())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.jshint.reporter('fail'));
//
// });
//
// //lints and builds local or production JS based on --production flag
// gulp.task('js:build', function (production) {
//   var isProductionBuild = production ? true : false;
//   var filename = packageJson.name + '-' + packageJson.version + '.min.js';
//
//   return gulp.src(['!**/**/*.spec.js', '**/**/*-module.js', '**/**/*.js'], {base: './src', cwd: './src'})
//     .pipe($.if(isProductionBuild, $.concat(filename)))
//     .pipe($.if(isProductionBuild, $.uglify()))
//     .pipe(gulp.dest('./dest/assets/js/'));
//
// });
//
//CSS related gulp tasks
//directory context is the cwd of gulpfile.js (/webapp/)
// 'use strict';
//
// var loadPluginsConfig = require('./configs/load-plugin-config.json');
// var $ = require('gulp-load-plugins')(loadPluginsConfig);
// var gulp = require('gulp-param')(require('gulp'), process.argv);
// var packageJson = require('../package.json');
//
// var lessLintTasks = $.lazypipe()
//   .pipe($.less)
//   .pipe($.csslint, 'csslintrc.json')
//   .pipe($.csslint.reporter)
//   .pipe($.csslint.failReporter);
//
// //convenience task for just linting CSS
// gulp.task('less:lint', function () {
//
//   return gulp.src(['./src/**/**/*.less', '!./src/less/as-webapp.less'])
//     .pipe(lessLintTasks());
//
// });
//
// //compiles application less, lints the CSS, and generates developer or production CSS based on --production flag
// gulp.task('less:build', function (production) {
//   var isProductionBuild = production ? true : false;
//   var lessFiles = ['./src/less/as-webapp.less', './src/**/**/*.less'];
//   var filename = packageJson.name + '-' + packageJson.version + '.min.css';
//
//   return gulp.src(lessFiles)
//     .pipe($.less())
//     .pipe($.if(isProductionBuild, $.concat(filename)))
//     .pipe($.autoprefixer({
//       browsers: ['last 2 versions', 'Explorer >= 9']
//     }))
//     .pipe($.if(isProductionBuild, $.minifyCss()))
//     .pipe(gulp.dest('./dest/assets/css'));
//
// });
//
//
//
// var gulp = require('gulp');
// var karma = require('karma').server;
//
// //run tests and keep runner open, for doing test driven development
// gulp.task('test:tdd', function () {
//
//   karma.start({
//     configFile: __dirname + '/../karma.conf.js',
//     autoWatch: true,
//     singleRun: false,
//     browsers: ['Chrome']
//   });
//
// });
//
// //will run all tests and generate coverage output, primarily for Jenkins
// gulp.task('test:coverage', function () {
//
//   return karma.start({
//     configFile: __dirname + '/../karma-coverage.conf.js',
//     browsers: ['PhantomJS']
//   });
//
// });