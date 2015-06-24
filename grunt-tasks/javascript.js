/*
 * Grunt related tasks for handling Javascript files
 */
'use strict';

var jsFiles = [
  '*.js',
  'grunt-tasks/*.js',
  'src/**/**/*.js'
];

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-ng-annotate');

  grunt.config.merge({
    concat: {
      dist: {
        src: [
          'dest/assets/js/vendor/angular.js',
          'dest/assets/js/vendor/*.js',
          'dest/assets/js/modules/config/config-module.js',
          'dest/assets/js/modules/language/language-module.js',
          'dest/assets/js/modules/header/header-module.js',
          'dest/assets/js/modules/footer/footer-module.js',
          'dest/assets/js/modules/bootstrap/bootstrap.js',
          'dest/assets/js/modules/**/*-module.js',
          'dest/assets/js/modules/**/*.js',
          '!dest/assets/js/modules/**/*.spec.js'
        ],
        dest: 'dest/assets/js/<%= pkg.name %>.min.js'
      }
    },

    jscs: {
      src: jsFiles,
      options: {
        config: '.jscsrc'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: './node_modules/jshint-stylish',
        verbose: true
      },
      jsFiles: {
        src: jsFiles
      }
    },

    ngAnnotate: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: ['**/*.js', '!**/*-test.js'],
          dest: 'tmp/'
        }, {
          expand: true,
          cwd: 'src/',
          src: [
            'src/**/**/*.js',
            '!src/**/*-test.js'
          ],
          dest: 'tmp/assets/js'
        }]
      }
    },

    uglify: {
      options: {}, //we will be using logLevels to manage output
      build: {
        files: [{
          expand: true,
          cwd: 'dest/',
          src: [
            '!assets/js/vendor/ngui.js',
            '**/**/*.js'
          ],
          dest: 'dest/'
        }]
      }
    }

  });

  grunt.registerTask('js:dev', ['jshint', 'jscs', 'copy:js']); //generate js for dev task
  grunt.registerTask('js:build', ['jshint', 'jscs', 'copy:js', 'ngAnnotate:build', 'uglify:build', 'concat:dist']); //generate js for build task

};