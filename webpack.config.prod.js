/**
 * Webpack config
 */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // debug: true,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: path.resolve(__dirname, 'client/index'),
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // Minify Js
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '../styles/main.css',
      allChunks: true
    })
  ],
  module: {
    loaders: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client'),
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
