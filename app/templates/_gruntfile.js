// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var moment = require('moment');
 
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
 
module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      livereload: {
        files: [
          'index.html'
        ],
        tasks: ['build']
      },
      html: {
        files: ['index.html', 'partials/*.html'],
        tasks: ['htmlmin']
      },

      js: {
        files: ['js/*'],
        tasks: ['jslint', 'concat:javascript', 'uglify']
      },

      css: {
        files: ['scss/*.scss'],
        tasks: ['buildcss']
      }
    },
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.')
            ];
          }
        }
      }
    },
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },



    karma: {
      unit: {
        configFile: 'karma.config.js'
      }
    },
    
    protractor: {
      options: {
        configFile: "node_modules/protractor/referenceConf.js",
        keepAlive: true,
        noColor: false
      },
      your_target: {
        options: {
          configFile: "protractor.config.js"
        }
      }
    },

    yuidoc: {
      compile: {
        'name': '<%= appName %>',
        'description': '<%= appDescription %>',
        'version': '<%= appVersion %>',
        'url': 'http://10.110.2.36/m2m',
        options: {
          paths: [ "./js" ],
          outdir: 'docs/technical'
        }
      }
    },

    docco: {
      debug: {
        src: ['./js/*.js'],
        options: {
          output: 'docs/descriptive'
        }
      }
    },

    jslint: {
      server: {
        src: [
          'js/*.js'
        ],
        directives: {
          node: true,
          todo: true,
          server: true,
          plusplus: true
        },
        options: {
          edition: 'latest',
          errorsOnly: true,
          failOnError: false
        }
      }
    },

    concat: {
      javascript: {
        files: {
          'dist/js/application.min.js': ['js/application.js', 'js/contentController.js'],
          'dist/js/libraries.min.js'  : ['bower_components/underscore/underscore.js',
                                         'bower_components/d3/d3.js',
                                         'bower_components/angular/angular.js',
                                         'bower_components/ng-csv/build/ng-csv.js',
                                         'bower_components/angular-route/angular-route.js',
                                         'bower_components/angular-translate/angular-translate.js',
                                         'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
                                         'bower_components/angular-bootstrap/ui-bootstrap.js',
                                         'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                                         'bower_components/angular-sanitize/angular-sanitize.js',
                                         'bower_components/angular-ui-date/src/date.js',
                                         'bower_components/angular-animate/angular-animate.js']
        }
      },
      css: {
        files: {
          'dist/css/style.css': ['production/css/custom.css',
                                 'production/css/default.css',
                                 'production/css/login.css',
                                 'production/css/style-metronic.css']
        }
      }
    },

    uglify: {
      build: {
        files: {
          'dist/js/application.min.js': ['dist/js/application.min.js'],
          'dist/js/libraries.min.js'  : ['dist/js/libraries.min.js']
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true
        },
        files: {
          'dist/index.html'           : 'index.html',
          'dist/partials/advise.html' : 'partials/content.html'
        }
      }
    },

    sass: {
      build: {
        files: {
          'production/css/custom.css'         : 'scss/custom.scss',
          'production/css/default.css'        : 'scss/default.scss',
          'production/css/login.css'          : 'scss/login.scss',
          'production/css/style-metronic.css' : 'scss/style-metronic.scss'
        }
      }
    },

    cssc: {
      build: {
        options: {
          sortSelectors              : true,
          lineBreaks                 : false,
          sortDeclarations           : true,
          consolidateViaDeclarations : false,
          consolidateViaSelectors    : false,
          consolidateMediaQueries    : false
        },
        files: {
          'dist/css/style.css': ['dist/css/style.css']
        }
      }
    },

    cssmin: {
      build: {
        'dist/css/style.css': ['dist/css/style.css']
      }
    },

    copy: {
      main: {
        src: ['images/**', 'translations/**'],
        dest: 'dist/'
      },
    },

    clean: {
      build: {
        src: ['production/css/custom.css', 
              'production/css/default.css',
              'production/css/login.css',
              'production/css/style-metronic.css']
      }
    }
  });
 
  grunt.registerTask('server', ['connect:livereload', 'open', 'watch']);
  grunt.registerTask('default', ['karma', 'document', 'concat:javascript', 'uglify', 'htmlmin', 'buildcss', 'copy', 'protractor']);
  grunt.registerTask('buildcss',  ['sass', 'concat:css', 'clean', 'cssc', 'cssmin']);
  grunt.registerTask('test', ['karma', 'protractor']);
  grunt.registerTask('document', ['yuidoc', 'docco']);
};