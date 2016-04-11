var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'tests/**/*.spec.js'
    ],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
    },
    reporters: ['dots', 'progress', 'coverage'],
    webpack: {
      babel: {
        presets: ['es2015', 'react']
      },
      isparta: {
        babel: {
          presets: ['es2015', 'react']
        }
      },
      module: {
        loaders: [
          {
            test: /\.js$|\.jsx$/,
            loader: 'babel',
            exclude: [
              '/node_modules',
              path.resolve('src/scripts/')
            ]
          },
          {
            test: /\.js$|\.jsx$/,
            loader: 'isparta',
            include: path.resolve('src/scripts/')
          }
        ]
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      reporters: [
        {
          type: 'text-summary',
        },
        {
          type: 'lcov',
          dir: 'coverage',
          subdir: '.'
        }
      ]
    },
  });
};
