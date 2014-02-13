module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      js_before: ['public/js/*'],
      js_after: [
        'public/js/lib/angular.js',
        'public/js/lib/angular-ui-router.js',
        'public/js/main.js'
      ]
    },

    uglify: {
      options: {
        banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      lib: {
        files: {
          'public/js/lib/jquery.js':'private/bower/jquery/jquery.js',
          'public/js/lib/angular.js':'private/bower/angular/angular.js',
          'public/js/lib/angular-ui-router.js':'private/bower/angular-ui-router/release/angular-ui-router.js',
        }
      },
      src: {
        files: [{
          expand: true,
          cwd: 'private/js',
          src: 'main.js',
          dest: 'public/js'
        }]
      },
      app: {
        files: {
          'public/js/app.min.js': 'public/js/app.js'
        }
      }
    },

    concat: {
      app: {
        options: {
          stripBanners: false,
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        },
        src: [
          'public/js/lib/angular.js',
          'public/js/lib/angular-ui-router.js',
          'public/js/main.js'
        ],
        dest: 'public/js/app.js'
      }
    },

    sass: {
      build: {
        files: [{
          expand: true,
          cwd: 'private/css',
          src: ['*.scss'],
          dest: 'private/css',
          ext: '.css'
        }]
      }
    },

    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 version']
        },
        src: 'private/css/app.css',
        dest: 'private/css/app.css'
      }
    },

    cssmin: {
      combine: {
        files: {
          'public/css/app.css': ['private/css/app.css']
        }
      }
    },

    copy: {
      partials: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            'private/partials/**'
          ],
          dest: 'public/partials/',
          filter: 'isFile'
        }]
      }
    },

    watch: {
      js: {
        files: [
          'private/**/*.js'
        ],
        tasks: ['js'],
        options: {
          spawn: false,
          interrupt: true,
          debounceDelay: 250
        },
      },
      css: {
        files: [
          'private/**/*.scss'
        ],
        tasks: ['css'],
        options: {
          spawn: false,
          interrupt: true,
          debounceDelay: 250
        },
      },
      partials: {
        files: [
          'private/**/*.scss'
        ],
        tasks: ['css'],
        options: {
          spawn: false,
          interrupt: true,
          debounceDelay: 250
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('js', ['clean:js_before','uglify:lib','uglify:src','concat','uglify:app','concat','clean:js_after']);
  grunt.registerTask('css', ['sass','autoprefixer','cssmin']);
  grunt.registerTask('partials', ['copy'])

  grunt.registerTask('default', ['js','css','partials']);

};