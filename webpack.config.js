var path = require('path');

module.exports = {
  entry: {
    index: ['./index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: '[name].js'
  },
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        cacheDirectory: path.resolve(__dirname, '.babel-cache')
      }
    }
  ]
};
