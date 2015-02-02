/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',
  config_file: 'config.js',

  app_files: {
    js: [
      'src/app/**/*.module.js',
      'src/app/**/*.js'
    ],
    scss_dir: 'src/scss/',
    assets_dir: 'src/assets/',
    html: 'src/app/**/*.html',
    indexHtml: 'src/index.html'
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/lodash/lodash.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-resource/angular-resource.min.js',
      'bower_components/angular-sanitize/angular-sanitize.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js'
    ],
    css: [],
    assets: []
  }
};