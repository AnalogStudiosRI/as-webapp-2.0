/*jshint node:true, es3: false */
'use strict';

var _ = require('lodash');

module.exports = function (grunt) {
  var lessFiles = [{
    expand: true,
    cwd: 'src/pages',
    src: [ '**/*.less' ],
    dest: 'tmp/',
    ext: '.css'
  }, {
    src: [ 'src/less/<%= pkg.name %>.less' ],
    dest: 'tmp/assets/css/<%= pkg.name %>.css'
  }];

  function getGlobalAssets(env) {
    var toLoad = {};
    var globals = grunt.file.readJSON('src/globals.json')[env];

    globals = _.map(globals, function (value) {
      return value;
    });
    globals = _.flatten(globals);
    globals = _.pluck(globals, 'src');

    globals = globals.map(function (path) {
      return path.replace(/^\/assets\/(css|js)\//, '');
    });

    toLoad.css = globals.filter(function (path) {
      return (/.+\.css$/).test(path);
    });

    toLoad.js = globals.filter(function (path) {
      return (/.+\.js/).test(path);
    });

    return toLoad;
  }

  function getScriptsToConcat() {
    var globals = grunt.file.readJSON('src/globals.json').dev.scripts;

    globals = _.map(globals, function (value) {
      return value;
    });

    globals = _.flatten(globals);
    globals = _.pluck(globals, 'src');

    //filter out prefix so it can be found in the project src
    globals = globals.map(function (path) {
      return path.replace(/^\/players\/assets\//, 'assets/');
    });

    return _(globals)
        .map(function (file) {
          return 'dest/' + file;
        })
        .value();
  }

  function getConfigForSiteLayout(prodFlag) {
    return {
      options: {
        layout: 'site.hbs',
        production: prodFlag ? true : false
      },
      files: [{
        expand: true,
        cwd: 'src/pages/',
        src: [ '**/*.hbs', '!admin/*.hbs' ],
        dest: 'tmp/'
      }]
    };
  }

  function getConfigForAdminLayout(prodFlag) {
    return {
      options: {
        layout: 'admin.hbs',
        production: prodFlag ? true : false
      },
      files: [{
        expand: true,
        cwd: 'src/pages/',
        src: 'admin/*.hbs',
        dest: 'tmp/'
      }]
    };
  }

  //tasks + grunt config
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dest: [ 'dest/*' ],
      tmp: [ 'tmp/*' ]
    },

    //build
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

      html: {
        files: [
          'src/**/**/*.html'
        ],
        tasks: [ 'copy:html' ]
      }
    },

    copy: {
      assets: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'assets/**/**' ],
          dest: 'dest/'
        }, {
          expand: true,
          cwd: 'src/pages',
          src: [ '**/assets/**/**' ],
          dest: 'dest/'
        }]
      },

      vendorJSDev: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getGlobalAssets('dev').js ],
          dest: 'dest/assets/js/'
        }]
      },

      vendorJSProd: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getGlobalAssets('prod').js ],
          dest: 'dest/assets/js/'
        }]
      },

      vendorCSSDev: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getGlobalAssets('dev').css ],
          dest: 'dest/assets/css/'
        }]
      },

      vendorCSSProd: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getGlobalAssets('prod').css ],
          dest: 'dest/assets/css/'
        }]
      },

      vendorFont: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ '**/**/*.eot', '**/**/*.svg', '**/**/*.ttf', '**/**/*.woff' ],
          dest: 'dest/assets/fonts/'
        }]
      },

      css: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: [ '**/*.css' ],
          dest: 'dest/'
        }]
      },

      js: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ 'services/**/*.js', 'features/**/*.js' ],
          dest: 'dest/assets/js/'
        }, {
          expand: true,
          cwd: 'src/pages',
          src: [ '**/*.js', '!**/*-test.js' ],
          dest: 'dest/'
        }]
      },

      html: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [ '**/**/*.html' ],
          dest: 'dest/'
        }]
      },

      pages: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: [ '**/*.html' ],
          dest: 'dest/',
          rename: function (dest, src) {
            return dest + '/' + src.split('/')[0] + '/index.html';
          }
        }]
      },

      //XXX TODO do with Apache rewrite?
      home: {
        files: [{
          expand: true,
          cwd: '.',
          src: [ 'tmp/home/*.html' ],
          dest: 'dest/',
          rename: function (dest) {
            return dest + '/index.html';
          }
        }]
      }
    },

    //CSS
    lesslint: {
      options: {
        imports: [
          'src/less/**/**/*.less'
        ],
        csslint: {
          csslintrc: '.csslintrc'
        }
      },
      src: [
        'src/less/<%= pkg.name %>.less',
        'src/pages/**/*.less',
        'src/features/**/*.less'
      ]
    },

    less: {
      dev: {
        files: lessFiles,
        options: {
          dumpLineNumbers: 'comments'
        }
      },
      build: {
        files: lessFiles
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ff 15', 'android 2.3', 'ie 8'] // ['> 1%', 'last 2 versions', 'ff 17', 'opera 12.1']
      },
      // By not including a dest path, we tell Autoprefixer to update files in place
      files: {
        src: 'tmp/**/*.css'
      }
    },

    cssmin: {
      options: {
        processImport: false
      },
      files: {
        expand: true,
        cwd: 'tmp/',
        src: [ '**/*.css' ],
        dest: 'dest/'
      }
    },

    //js
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      jsFiles: {
        src: [
          'src/pages/**/*.js',
          'src/features/**/*.js',
          'src/services/**/*.js',
          'tasks/*.js'
          //'scaffolds/**/*.js'
        ]
      }
    },

    uglify: {
      options: {}, //we will be using logLevels to manage output
      build: {
        files: [{
          expand: true,
          cwd: 'tmp/',
          src: [ '**/**/*.js' ],
          dest: 'dest/'
        }]
      }
    },

    concat: {
      dist: {
        src: getScriptsToConcat(),
        dest: 'dest/assets/js/core.min.js'
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
          src: ['services/**/*.js', 'features/**/*.js', '!services/**/*-test.js', '!features/**/*-test.js'],
          dest: 'tmp/assets/js'
        }]
      }
    },

    //html
    assemble: {
      options: {
        layoutdir: 'src/layouts/',
        partials: [ 'src/partials/*.hbs' ],
        data: [ 'package.json', 'src/pages/**/*.json', 'src/globals.json' ],
        flatten: true
      },
      siteDev: getConfigForSiteLayout(),
      siteProd: getConfigForSiteLayout(true),
      adminDev: getConfigForAdminLayout(),
      adminProd: getConfigForAdminLayout(true)
    },

    'asset_cachebuster': {
      build: {
        options: {
          buster: '<%= pkg.version %>'
        },
        files: [
          { expand: true, cwd: 'dest', src: '**/*.css', rename: function (dest, src) {
            return 'dest/' + src;
          } },
          { expand: true, cwd: 'dest', src: '**/*.html', rename: function (dest, src) {
            return 'dest/' + src;
          } }
        ]
      }
    },

    //server
    open: {
      local: {
        path: 'http://local.analogstudios.thegreenhouse.io:<%= connect.options.port %>/home/'
      }
    },

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
            '/api' : 'http://analogstudios.api.1000-bc.thegreenhouse.io/api'  //if you have bas-api locally
          }
        }
      },
      dev: {
        options: {
          router: {
            '/api' : 'http://analogstudios.thegreenhouse.io/api',
            '/assets/images/products' : 'http://analogstudios.thegreenhouse.io/assets/images/products'
          }
        }
      }
    }

  });

  //contrib
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //vendor
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-asset-cachebuster');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-html-validation');
  grunt.loadNpmTasks('grunt-bump');
  //grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-open');

  //css
  grunt.registerTask('css:dev', [ 'lesslint', 'less:dev', 'autoprefixer', 'copy:css' ]); //generate css for dev task
  grunt.registerTask('css:build', [ 'lesslint', 'less:build', 'autoprefixer', 'cssmin' ]); //generate css for build task

  //js
  grunt.registerTask('js:dev', [ 'jshint', 'copy:js' ]); //generate js for dev task
  grunt.registerTask('js:build', [ 'jshint', 'ngAnnotate:build', 'uglify:build', 'concat:dist' ]); //generate js for build task

  //copy
  grunt.registerTask('copy:common', [ 'copy:assets', 'copy:html', 'copy:pages', 'copy:home' ]);
  grunt.registerTask('copy:vendorDev', [ 'copy:vendorJSDev', 'copy:vendorCSSDev', 'copy:vendorFont' ]); //copy vendor files
  grunt.registerTask('copy:vendorProd', [ 'copy:vendorJSProd', 'copy:vendorCSSProd', 'copy:vendorFont' ]); //copy vendor files

  //serve
  grunt.registerTask('serve:local', ['open:local', 'connect:local', 'watch']); //view the build locally, with as-api
  grunt.registerTask('serve:dev', ['open:local', 'connect:dev', 'watch']); //view the build locally

  //build tasks
  grunt.registerTask('buildDev', [
    'css:dev',
    'js:dev',
    'assemble:siteDev',
    'assemble:adminDev',
    'copy:vendorDev',
    'copy:common'
  ]);

  //development tasks
  grunt.registerTask('dev', [
    'clean',
    'buildDev',
    'clean:tmp',
    'serve:dev'
  ]);

  //build + serve
  grunt.registerTask('build', [
    'clean',
    'css:build',
    'js:build',
    'assemble:siteProd',
    'assemble:adminProd',
    'copy:vendorProd',
    'copy:common',
    'asset_cachebuster',
    //'karma:ci',  TODO PAAS-3
    //'validation', TODO PAAS-2
    'clean:tmp'
  ]);

  grunt.registerTask('show:dev', [
    'build',
    'serve:dev'
  ]);

  grunt.registerTask('show:local', [
    'build',
    'serve:local'
  ]);
};