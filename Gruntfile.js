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
    dest: 'dest/assets/css/<%= pkg.name %>.css'
  }];

  function getBowerAssets(env) {
    var toLoad = {};
    var globals = grunt.file.readJSON('src/globals.json');
    //grunt.log.writeln(globals);

    globals = globals.bowerComponents[env];
    globals = _.map(globals, function (value) {
      return value;
    });
    globals = _.flatten(globals);
    globals = _.pluck(globals, 'src');

    //grunt.log.writeln(globals);

    globals = globals.map(function (path) {
      //grunt.log.writeln('JS path ->' + path);
      return path.replace(/^\/assets\/(css|js)\//, '');
    });

    toLoad.css = globals.filter(function (path) {
      //grunt.log.writeln('CSS path ->' + path);
      return (/.+\.css$/).test(path);
    });

    toLoad.js = globals.filter(function (path) {
      return (/.+\.js/).test(path);
    });

    return toLoad;
  }


  function bowerAssetRename(dest, src) {
    var srcArray = src.split('/');
    var newSrc = 'dest/assets/';

    //standardize filename, so .min files are just filename.js
    //and the directory structure is flattened for supporting AMD
    var filename = srcArray[srcArray.length - 1].replace('.min', '');

    //grunt.log.writeln('filename => ' + filename);
    var ext = filename.split('.')[1];

    switch (ext) {
      case 'css':
        newSrc += 'css/';
        break;
      case 'js':
        newSrc += 'js/';
        break;
    }

    newSrc += 'vendor/' + filename;
    //grunt.log.writeln('final => ' + newSrc);

    return newSrc;
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

      templates: {
        files: [
          'src/features/**/*.html'
        ],
        tasks: [ 'copy:templates' ]
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

      vendorDev: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getBowerAssets('dev').js, getBowerAssets('dev').css ],
          dest: 'dest/assets/',
          rename: bowerAssetRename
        }]
      },

      vendorProd: {
        files: [{
          expand: true,
          cwd: 'bower_components/',
          src: [ getBowerAssets('prod').js, getBowerAssets('prod').css ],
          dest: 'dest/assets/',
          rename: bowerAssetRename
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

      ngUI: {
        files: [{
          expand: true,
          cwd: 'bower_components/ngui/dist',
          src: [ '**/**/*.js' ],
          dest: 'dest/assets/js/'
        }, {
          expand: true,
          cwd: 'bower_components/ngui/dist/features',
          src: [ '**/**/*.html', '**/**/*.css' ],
          dest: 'dest/templates'
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
          cwd: 'src/features',
          src: [ '**/*.html' ],
          dest: 'dest/templates'
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
        src: [
          'dest/assets/js/vendor/angular.js',
          'dest/assets/js/vendor/*.js',
          'dest/assets/js/features/**/*.js',
          'dest/assets/js/services/config/config.js',
          'dest/assets/js/services/log4ng/log4ng.js',
          'dest/assets/js/services/language/language.js',
          'dest/assets/js/services/as-bootstrap/as-bootstrap.js',
          'dest/assets/js/services/**/*.js'
        ],
        dest: 'dest/assets/js/core.min.js'
      }
    },

    ngAnnotate: {
      build: {
        files: [{
          expand: true,
          cwd: 'src/pages',
          src: [ '**/*.js', '!**/*-test.js' ],
          dest: 'tmp/'
        }, {
          expand: true,
          cwd: 'src/',
          src: [ 'services/**/*.js', 'features/**/*.js', '!services/**/*-test.js', '!features/**/*-test.js' ],
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

    validation: {
      options: {
        'reset': true,
        'stoponerror' : false,
        'failHard' : true,
        'doctype' : 'HTML5',
        'reportpath' : 'reports/validation-report.json',
        'path' : 'reports/validation-status.json',
        'charset' : 'utf-8',
        'relaxerror': [
          'Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.',
          'Element object is missing one or more of the following attributes: data, type.',
          'Element head is missing a required instance of child element title.'
        ]
      },
      files: {
        src: [
          'tmp/**/**/*.html',
          '!tmp/templates/**/*'
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
            '/api' : 'http://analogstudios.api.thegreenhouse.io/api'  //if you have as-api locally
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
  grunt.registerTask('copy:common', [ 'copy:assets', 'copy:html', 'copy:pages', 'copy:home', 'copy:ngUI' ]);
  grunt.registerTask('copy:dev', [ 'copy:vendorDev', 'copy:vendorFont' ]); //copy vendor files
  grunt.registerTask('copy:prod', [ 'copy:vendorProd', 'copy:vendorFont' ]); //copy vendor files

  //serve
  grunt.registerTask('serve:local', ['open:local', 'connect:local', 'watch']); //view the build locally, with as-api
  grunt.registerTask('serve:dev', ['open:local', 'connect:dev', 'watch']); //view the build locally

  //development tasks
  grunt.registerTask('dev', [
    'clean',
    'css:dev',
    'js:dev',
    'assemble:siteDev',
    'assemble:adminDev',
    'copy:common',
    'copy:dev',
    'clean:tmp',
    'serve:dev'
  ]);

  //build + serve
  grunt.registerTask('build', [
    'clean',
    'css:build',
    'assemble:siteProd',
    'assemble:adminProd',
    //'validation',
    'copy:common',
    'copy:prod',
    'js:build',
    'asset_cachebuster',
    //'karma:ci',  TODO PAAS-3
    'clean:tmp'
  ]);

  grunt.registerTask('show:build', [
    'clean',
    'assemble:siteProd',
    'assemble:adminProd',
    'copy:common',
    'copy:prod',
    'css:build',
    'js:build',
    'asset_cachebuster',
    'clean:tmp',
    'serve:dev'
  ]);

};