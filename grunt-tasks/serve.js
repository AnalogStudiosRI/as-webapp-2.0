/*
 * Grunt related tasks for local development
 */
'use strict';

var ForwardProxy = require('../grunt-services/forward-proxy.js');
var _ = require('lodash');

module.exports = function (grunt) {

  grunt.config.merge({

    connect: {
      options: {
        hostname: '*',
        protocol: 'http',
        port: 1981,
        base: 'dest/',
        livereload: true,
        middleware: function (connect, options) {
          return _.flatten([
            ForwardProxy.getProxy(options.router),
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
          'src/pages/**/*.js', 'src/modules/**/*.js', 'src/services/**/*.js'
        ],
        tasks: [ 'js:dev' ]
      },

      modules: {
        files: [
          'src/modules/**/*.html'
        ],
        tasks: ['copy:modules']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('serve:local', ['open:local', 'connect:local', 'watch']); //view the build locally, with as-api
  grunt.registerTask('serve:dev', ['open:local', 'connect:dev', 'watch']); //view the build locally against dev

};