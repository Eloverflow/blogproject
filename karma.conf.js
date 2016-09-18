//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './src',

    files: [
      'app/**/*.js',
      'app/**/*.css'
    ],

    autoWatch: true,

    frameworks: ['jasmine', 'browserify'],
    preprocessors: {
      'app/tests/*.js': [ 'browserify' ]
    },

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