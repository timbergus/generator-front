// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';
var moment = require('moment');
 
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
 
module.exports = function (grunt) {

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

    /*concat: {
      javascript: {
        files: {
          'dist/js/application.min.js': ['js/application.js', 'js/ContentController.js'],
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
          'dist/css/style.css': ['dist/css/bootstrap.css',
                                 'dist/css/font-awesome.css']
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
    },*/

    htmlmin: {
      dist: {
        options: {
          removeComments: true
        },
        files: {
          'dist/partials/content.html' : 'partials/content.html'
        }
      }
    },

    less: {
      build: {
        files: {
          'dist/css/bootstrap.css': 'bower_components/bootstrap/less/bootstrap.less'
        }
      }
    },

    sass: {
      build: {
        files: {
          'dist/css/font-awesome.css': 'bower_components/font-awesome/scss/font-awesome.scss'
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
          'dist/css/style.css' : ['dist/css/style.css']
        }
      }
    },

    cssmin: {
      build: {
        'dist/css/style.css': ['dist/css/style.css']
      }
    },

    copy: {
      task_a: {
        src  : ['images/**', 'translations/**'],
        dest : 'dist/'
      },
      task_b: {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts/',
        dest: 'dist/fonts/',
        src: ['*']
      },
      task_c: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        dest: 'dist/fonts/',
        src: ['*']
      },
      task_d: {
        src  : 'index.html',
        dest : 'dist/index.html'
      }
    },

    clean: {
      build: {
        src: ['dist/css/bootstrap.css', 
              'dist/css/font-awesome.css',
              '.sass-cache',
              '.tmp']
      }
    },

    protractor_webdriver: {
      your_target: {
        options: {
          command: 'webdriver-manager start'
        },
      },
    },

    htmlhint: {
      html1: {
        options: {
          'tag-pair': true
        },
        src: ['*.html']
      },
      html2: {
        options: {
          'tag-pair': true
        },
        src: ['partials/*.html']
      }
    },

    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },

    usemin: {
      html: ['dist/index.html']
    }
  });
 
  grunt.registerTask('server'           , ['connect:livereload', 'open', 'watch']);
  grunt.registerTask('test'             , ['karma', 'protractor_webdriver', 'protractor']);
  grunt.registerTask('documentation'    , ['yuidoc', 'docco']);
  
  grunt.registerTask('default'          , ['copy:task_d',
                                           'useminPrepare',
                                           'concat',
                                           'uglify',
                                           'cssc',
                                           'cssmin',
                                           'usemin',
                                           'clean',
                                           'build_html',
                                           'copy:task_a',
                                           'copy:task_b',
                                           'copy:task_c']);

  grunt.registerTask('build_html'       , ['htmlhint', 'htmlmin']);
  grunt.registerTask('build_javascript' , ['concat:javascript', 'uglify']);
  grunt.registerTask('build_css'        , ['sass', 'less', 'concat:css', 'cssc', 'cssmin', 'clean']);
};