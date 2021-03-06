/**
 * @module     GruntFile
 * @desc       Grunt configuration
 * @author     Kevin Blanco <me@kevin-blanco.com>
 * @repo       https://github.com/kevinblanco/grunt-getting-started
 */

module.exports = function(grunt) {

  var path = require('path');
  var root = path.normalize(__dirname+"/..");
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
  };

  /**
   * Basic deploy / public file-path
   */
  const BASE = './';

  /**
   * The location of the development sources
   */
  const SOURCES = BASE + 'src/';

  /**
   * Directory to output compiled source-files
   */
  const DIST = BASE + 'public/';

  /**
   * The port number to mount the NodeJS Server
   */
  const PORT = 3001


   /**
   *  Grunt Configuration
   */
  grunt.initConfig({


    // Package Loading
    pkg: grunt.file.readJSON('package.json'),


    //
    // Clean Directories
    // 
    clean: {
      local: DIST
    },


    //
    // Uglify JS
    // 
    uglify: {
      build: {
        files: {
          'public/js/scripts.min.js': [ SOURCES + 'scripts/*.js',  SOURCES + 'scripts/**/*.js']
        }
      }
    },


    //
    // Compile SASS
    // 
    sass: {
      local: {

        files: [{
          expand: true,
          cwd: SOURCES + 'styles/export',
          src: ['*.scss'],
          dest: DIST + 'css',
          ext: '.css'
        }],

        options: {
          style: 'compact',
          debug: false
        }
      }
    },


    //
    // Copy Files
    // 
    copy:{
      main:{
       files: [
         {
            expand: true, 
            cwd: SOURCES + 'html/',
            src: ['**'], 
            dest: DIST
          }
        ]
      }
    },
    

    //
    // Starts a Connect Server
    // 
    connect: {
      server: {
        options: {
          port: PORT,
          base: DIST,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, options.base)]
          }
        }
      }
    },


    //
    // Add the livereload server
    // 
    'livereload': {
      port: 35729
    },


    //
    // Notify System
    // 
    notify_hooks: {
      options: {
        enabled: true,
        title: "<%= pkg.name %>"
      }
    },


    //
    // Notify Messages
    // 
    notify: {
      pages: {
        options: {
          title: '<%= pkg.name %>',
          message: 'Html - Done!'
        }
      },
      scripts: {
        options: {
          title: '<%= pkg.name %>',
          message: 'Javascript - Done!'
        }
      },
      styles: {
        options: {
          title: '<%= pkg.name %>',
          message: 'Sass - Done!'
        }
      }
    },


    //
    // Wach Changes
    // 
    regarde: {

      pages: {
        files: 'src/html/**/*',
        tasks: ['copy:main', 'notify:pages', 'livereload']
      },

      scripts: {
        files: [
          'src/scripts/**/*'
        ],
        tasks: ['uglify', 'notify:scripts', 'livereload']
      },

      styles: {
        files: 'src/styles/**/*',
        tasks: ['sass:local', 'notify:styles', 'livereload']
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-notify');

  // Growl Notification Hook
  grunt.task.run('notify_hooks');

  // Default task(s).
  grunt.registerTask('run', ['clean', 'uglify', 'copy', 'sass', 'livereload-start', 'connect:server', 'regarde']);

};