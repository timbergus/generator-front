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

  require('time-grunt')(grunt);

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
        tasks: ['htmlhint']
      },
      html: {
        files: ['index.html', 'partials/*.html'],
        tasks: ['htmlhint']
      },

      js: {
        files: ['js/*'],
        tasks: ['jslint']
      },

      css: {
        files: ['scss/*.scss'],
        tasks: ['build_css']
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
          'scss/css/bootstrap.css': 'bower_components/bootstrap/less/bootstrap.less'
        }
      }
    },

    sass: {
      build: {
        files: [{
          src: ['bower_components/font-awesome/scss/font-awesome.scss'],
          dest: 'scss/css/font-awesome.css'
        },
        {
          expand: true,
          cwd: 'scss',
          src: ['**/*.scss'],
          dest: 'scss/css',
          ext: '.css'
        }]
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
      },
      task_e: {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts/',
        dest: 'scss/fonts/',
        src: ['*']
      },
      task_f: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        dest: 'scss/fonts/',
        src: ['*']
      }
    },

    clean: {
      build: {
        src: ['.sass-cache',
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
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['scss/*.css', '!scss/bootstrap.css', '!scss/bootstrap.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['scss/*.css', '!scss/bootstrap.css', '!scss/bootstrap.css']
      }
    }
  });
 
  grunt.registerTask('server'           , ['build_css', 'connect:livereload', 'open', 'watch']);
  grunt.registerTask('test'             , ['htmlhint', 'karma', 'protractor_webdriver', 'protractor']);
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
  grunt.registerTask('build_css'        , ['sass', 'less', 'copy:task_e', 'copy:task_f', 'csslint']);
};