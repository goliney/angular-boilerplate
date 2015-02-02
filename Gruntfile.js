module.exports = function (grunt) {

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  /**
   * Load in our build configuration file.
   */
  var userConfig = require('./config.js');

  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  var taskConfig = {
    pkg: grunt.file.readJSON('package.json'),

    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '/* <%= pkg.description %>\n' +
      ' */\n'
    },

    /**
     * The `copy` task just copies files from A to B. We use it here to copy
     * our project assets (images, fonts, etc.) into `build_dir`
     */
    copy: {
      indexHtml: {
        src: '<%= app_files.indexHtml %>',
        dest: '<%= build_dir %>/index.html'
      },
      assets: {
        expand: true,
        cwd: '<%= app_files.assets_dir %>',
        src: '**',
        dest: '<%= build_dir %>/assets/'
      }
    },

    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      /**
       * The `build_vendor_css` concatenates vendor CSS together.
       */
      build_vendor_css: {
        src: [
          '<%= vendor_files.css %>'
        ],
        dest: '<%= build_dir %>/css/app.vendor.css'
      },
      /**
       * The `build_vendor_js` target is the concatenation of
       * all specified vendor source code into a single file.
       */
      build_vendor_js: {
        src: [
          '<%= vendor_files.js %>'
        ],
        dest: '<%= build_dir %>/js/app.vendor.js'
      }
    },
    /**
     * `grunt compass` compiles scss/sass files into css.
     */
    compass: {
      build_css: {
        options: {
          sassDir: 'src/scss',
          cssDir: '<%= build_dir %>/css'
        }
      }
    },
    /**
     * `grunt cssmin` minifies content of css files.
     */
    cssmin: {
      /**
       * `build` target minifies and rewrites already compiled
       * app and vendor css files
       */
      build: {
        files: {
          '<%= build_dir %>/css/app.css': '<%= build_dir %>/css/app.css',
          '<%= build_dir %>/css/app.vendor.css': '<%= build_dir %>/css/app.vendor.css'
        }
      }
    },
    /**
     * `grunt uglify` concatenates and minifies app js sources.
     */
    uglify: {
      app: {
        options: {
          banner: '<%= meta.banner %>',
          sourceMap: true
        },
        files: {
          '<%= build_dir %>/js/app.js': ['<%= app_files.js %>']
        }
      }
    },
    /**
     * `grunt ngtemplates` automatically caches minified HTML templates with $templateCache.
     */
    ngtemplates: {
      app: {
        options: {
          module: 'app.templates',
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true
          }
        },
        src: '<%= app_files.html %>',
        dest: '<%= build_dir %>/js/app.templates.js'
      }
    }

  };
  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  // Tasks
  grunt.registerTask('default', ['copy', 'concat', 'compass', 'cssmin', 'uglify', 'ngtemplates']);

};