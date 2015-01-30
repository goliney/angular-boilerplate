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
      banner:
      '/**\n' +
      ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '/* <%= pkg.description %>\n'  +
      ' */\n'
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
     * `grunt uglify` minifies js sources.
     */
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      files: {
        '<%= build_dir %>/js/app.js': '<%= build_dir %>/js/app.js'
      }
    }

  };
  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  // Tasks
  grunt.registerTask('default', ['concat', 'compass', 'cssmin']);

};