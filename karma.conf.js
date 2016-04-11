var webpackConfig = require('./webpack.config.js');

webpackConfig.plugins = [];

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'tests/config/tests.webpack.js',
    ],
    preprocessors: {
      'tests/config/tests.webpack.js': ['webpack'],
    },
    reporters: ['dots'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    }
  });
};
