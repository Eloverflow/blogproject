// Karma configuration
// Generated on Sun Sep 18 2016 22:48:25 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['ng-scenario', 'jasmine', 'browserify'],


    // list of files / patterns to load in the browser
    files: [
      'e2e-tests/scenarios.js',
      'src/app/bower_components/angular-mocks/angular-mocks.js',
      'src/app/bower_components/jquery/dist/jquery.min.js',
      'src/app/bower_components/tinymce-dist/tinymce.js',
      'src/app/bower_components/openfb/openfb.js',
      'src/app/app.js',
      'src/app/*/*.html',
      'src/app/controllers_res/starter.js',
      'src/app/controllers_res/constants.js',
      'src/app/controllers_res/services.js',
      'src/app/*/*.js',
      'src/app/*/*.spec.js',
      'src/app/bower_components/bootstrap/dist/js/bootstrap.min.js',
      'src/app/bower_components/bootbox.js/bootbox.js'
    ],


    // list of files to exclude
    exclude: [
      'src/app/index.html'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/app.js': [ 'browserify' ],
      'src/app/*/*.html': [ 'browserify' ],
      'src/app/*/*.js': [ 'browserify' ],
      'src/app/*/*.spec.js': [ 'browserify' ]
    },

    browserify: {
      debug: true,
      transform: ['babelify', 'stringify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
