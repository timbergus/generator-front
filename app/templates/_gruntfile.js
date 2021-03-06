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
          'app/index.html',
          'app/partials/*.html',
          'app/templates/*.html'
        ],
        tasks: ['htmlhint']
      },

      js: {
        files: ['app/js/*.js', 'app/js/controllers/*.js', 'app/js/directives/*.js', 'app/js/services/*.js', 'app/js/filters/*.js'],
        tasks: ['jslint']
      },

      css: {
        files: ['app/scss/*.scss'],
        tasks: ['build_css']
      }
    },

    connect: {
      options: {
        port: 9000,
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
        path: 'http://localhost:<%%= connect.options.port %>/app'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.config.js'
      }
    },
    
    protractor: {
      options: {
        configFile: 'node_modules/protractor/docs/referenceConf.js',
        keepAlive: true,
        noColor: false
      },
      your_target: {
        options: {
          configFile: 'protractor.config.js'
        }
      }
    },

    ngdocs: {
      options: {
        dest: 'docs/ngdocs',
        title: "<%= appName %> <%= appVersion %>",
        html5Mode: false,
        bestMatch: true
      },
      all: ['app/js/*.js', 'app/js/controllers/*.js', 'app/js/directives/*.js', 'app/js/services/*.js', 'app/js/filters/*.js']
    },

    docco: {
      debug: {
        src: ['app/js/*.js', 'app/js/controllers/*.js', 'app/js/directives/*.js', 'app/js/services/*.js', 'app/js/filters/*.js'],
        options: {
          output: 'docs/docco'
        }
      }
    },

    jslint: {
      server: {
        src: ['app/js/*.js', 'app/js/controllers/*.js', 'app/js/directives/*.js', 'app/js/services/*.js', 'app/js/filters/*.js'],
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
          'dist/partials/content.html' : 'app/partials/content.html'
        }
      }
    },

    sass: {
      build: {
        files: [{
          'app/scss/css/font-awesome.css': 'bower_components/font-awesome/scss/font-awesome.scss'
        },
        {
          expand: true,
          cwd: 'app/scss',
          src: ['**/*.scss'],
          dest: 'app/scss/css',
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
      images: {
        expand: true,
        cwd: 'app/images/',
        src  : ['**'],
        dest : 'dist/images/'
      },
      locations: {
        expand: true,
        cwd: 'app/translations/',
        src  : ['**'],
        dest : 'dist/translations/'
      },
      bootstrap_fonts: {
        expand: true,
        cwd: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap',
        src: ['**'],
        dest: 'dist/fonts/'
      },
      fontawesome_fonts: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        src: ['**'],
        dest: 'dist/fonts/'
      },
      index: {
        src  : 'app/index.html',
        dest : 'dist/index.html'
      },
      partials: {
        expand: true,
        cwd: 'app/partials/',
        src  : ['**'],
        dest : 'dist/partials/'
      },
      templates: {
        expand: true,
        cwd: 'app/templates/',
        src  : ['**'],
        dest : 'dist/templates/'
      },
      task_e: {
        expand: true,
        cwd: 'bower_components/bootstrap/fonts/',
        src: ['**'],
        dest: 'app/scss/fonts/'
      },
      task_f: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        src: ['**'],
        dest: 'app/scss/fonts/'
      }
    },

    clean: {
      build: {
        src: ['.sass-cache', '.tmp']
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
        src: ['app/*.html']
      },
      html2: {
        options: {
          'tag-pair': true
        },
        src: ['app/partials/*.html']
      }
    },

    useminPrepare: {
      html: 'app/index.html',
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
        src: ['app/scss/*.css', '!app/scss/bootstrap.css', '!app/scss/bootstrap.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['app/scss/*.css', '!app/scss/bootstrap.css', '!app/scss/bootstrap.css']
      }
    }
  });
 
  grunt.registerTask('serve'            , ['build_css', 'connect:livereload', 'open', 'watch']);
  grunt.registerTask('test'             , ['htmlhint', 'karma', 'protractor_webdriver', 'protractor']);
  grunt.registerTask('docs'             , ['ngdocs', 'docco']);
  
  grunt.registerTask('default'          , ['copy:index',
                                           'copy:partials',
                                           'copy:templates',
                                           'useminPrepare',
                                           'concat',
                                           'uglify',
                                           'cssc',
                                           'cssmin',
                                           'usemin',
                                           'clean',
                                           'build_html',
                                           'copy:images',
                                           'copy:locations',
                                           'copy:bootstrap_fonts',
                                           'copy:fontawesome_fonts']);

  grunt.registerTask('build_html'       , ['htmlhint', 'htmlmin']);
  grunt.registerTask('build_javascript' , ['concat:javascript', 'uglify']);
  grunt.registerTask('build_css'        , ['sass', 'copy:task_e', 'copy:task_f', 'csslint']);
};