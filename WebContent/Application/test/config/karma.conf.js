// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
    plugins: [
          'karma-jasmine',
          'karma-coverage',
          'karma-chrome-launcher',
          'karma-firefox-launcher'
      ],
    preprocessors: {
        '../../widgets/**/*.html': ['coverage']
      },
    // list of files / patterns to load in the browser
    files: [
      '../../app/_vendor/angular-1.2.14/angular.min.js',
      '../../app/_vendor/angular-mocks/angular-mocks.js',
      '../../app/myGoalsPage/*.js',
      '../../app/components/**/*.js',
     // '..//mock/**/*.js',
      '../unit/**/*.js',
      '../../app/_vendor/**/u*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
