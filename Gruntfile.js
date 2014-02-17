module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      js: ['public/js/*']
    },

    requirejs: {
      build: {
        options: {
          baseUrl: "private",
          name: "bower/almond/almond",
          out: "public/js/app.js",
          // optimize: 'none',
          deps: ['app'],
          paths: {
            "app":"js/app",
            "jquery": "bower/jquery/jquery",
            "angular": "bower/angular/angular",
            "fastclick": "bower/fastclick/lib/fastclick",
            "ui.router": "bower/angular-ui-router/release/angular-ui-router",
            "MainCtrl": "js/controller/main",
            "HomeCtrl": "js/controller/home",
            "ProjectsCtrl": "js/controller/projects",
            "ResumeCtrl": "js/controller/resume",
            "ConnectCtrl": "js/controller/connect"
          },
          shim: {
            "angular": {
              exports: "angular",
              deps: ["jquery"]
            },
            "ui.router": {
              deps: ["angular"]
            },
            "app": {
              deps: ['angular']
            }
          }

        }
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

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('js', ['clean:js','requirejs',]);
  grunt.registerTask('css', ['sass','autoprefixer','cssmin']);
  grunt.registerTask('partials', ['copy'])

  grunt.registerTask('default', ['js','css','partials']);

};