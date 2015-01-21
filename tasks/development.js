/*
 * Grunt related tasks for local development
 */

'use strict';

module.exports = function (grunt) {

  grunt.config.merge({

    connect: {
      options: {
        hostname: '*',
        protocol: 'http',
        port: 1982,
        base: 'dest/',
        livereload: true,
        middleware: function (connect, options) {
          return _.flatten([
            require('./tasks/forward-proxy')(options.router),
            connect.static(options.base),
            connect.directory(options.base),
            connect.logger({ format: 'dev' })
          ]);
        }
      },
      local: {
        options: {
          router: {
            '/api' : 'http://local.api.analogstudios.thegreenhouse.io/api'  //if you have as-api locally
          }
        }
      },
      dev: {
        options: {
          router: {
            '/api' : 'http://analogstudios.thegreenhouse.io/api'
          }
        }
      }
    },

    open: {
      local: {
        path: 'http://local.analogstudios.thegreenhouse.io:<%= connect.options.port %>/home/'
      }
    },

    watch: {
      options: {
        livereload: true,
        spawn: false
      },

      handlebars: {
        files: [ 'src/pages/**/*.hbs', 'src/layouts/*.hbs', 'src/partials/*.hbs' ],
        tasks: [ 'assemble:siteDev', 'assemble:adminDev', 'copy:pages', 'copy:home' ]
      },

      less: {
        files: [
          'src/pages/**/*.less', 'src/less/*.less', 'src/features/**/*.less'
        ],
        tasks: [ 'css:dev', 'clean:tmp' ]
      },

      js: {
        files: [
          'src/pages/**/*.js', 'src/features/**/*.js', 'src/services/**/*.js'
        ],
        tasks: [ 'js:dev' ]
      },

      features: {
        files: [
          'src/features/**/*.html'
        ],
        tasks: [ 'copy:features' ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

};