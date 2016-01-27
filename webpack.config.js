var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'get-links': ['./src/scripts/get-links.js'],
    background: ['./src/scripts/background.js'],
    popup: ['./src/scripts/popup.js'],
    vendor: [
      'jquery',
      'react'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'scripts/[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'scripts/vendor.js')
  ]
};
