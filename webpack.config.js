var path = require('path');

module.exports = {
  entry: {
    'get-links': ['./src/get-links.js'],
    background: ['./src/background.js'],
    popup: ['./src/popup.js']
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
