/**
 * Webpack config
 */

// import webpack from 'webpack';
// import path from 'path';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: './client/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client')
  },
  plugins: [
    // Eliminate duplicate plugins
    new webpack.optimize.DedupePlugin(),
    // Minify Js
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel-loader?sourceMap',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        } },
      { test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['react-hot-loader', 'babel-loader'] },
      { test: /\.scss$/, loader: 'style-loader!css-loader?url=false!sass-loader' },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
