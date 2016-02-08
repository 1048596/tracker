var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'public/bundle.js': './views/main.js',
    vendor: [
      'graphql',
      'graphql-relay',
      'history',
      'object-assign',
      'pluralize',
      'query-string',
      'react',
      'react-dom',
      'react-relay',
      'react-router',
      'react-router-relay',
      'cookie',
      'moment',
      'moment-timezone'
    ],
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
      },
      {
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ['', '.js', '.json'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./public/vendor.bundle.js")
  ],
};
