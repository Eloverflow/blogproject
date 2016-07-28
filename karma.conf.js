//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './src',

    files: [
      'lib/angular.min.js',
      'lib/angular-mocks.js',
      '*.js',
      'app/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
