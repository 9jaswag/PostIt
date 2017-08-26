const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  // devtool: debug ? 'inline-sourcemap' : true,
  entry: './client/index.js',
  module: {
    loaders: [
      { test: /\.jsx$/,
        loader: 'babel-loader?sourceMap',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy',
            'transform-class-properties'],
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      { test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1',
          'font-loader?format[]=truetype&format[]=woff&format[]=embedded-opentype'
        ] },
      { test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  output: {
    path: `${__dirname}/client/dist/`,
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // Minify Js
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
