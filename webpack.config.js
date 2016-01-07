var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'public/bundle.js': './app/main.js',
  },
  output: {
    path: './',
    filename: '[name]',
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        query: {
          plugins: ['./build/babelRelayPlugin'],
          presets: ['es2015', 'react', 'stage-0'],
        },
        test: /\.js$/,
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json'],
  },
};
