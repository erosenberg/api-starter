const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const paths = require('../paths');
const baseConfig = require('../../webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { DEV_SERVER_PORT, DEV_HOST, DEV_ENV_NAME, DEV_SERVER_PROTOCOL } = require('./constants.dev');
const { PROD_SERVER_PORT, PROD_HOST, PROD_SERVER_PROTOCOL } = require('../prod/constants.prod');

const config = _.merge(baseConfig, {
  entry: {
    bundle: [
      `webpack-dev-server/client?${DEV_SERVER_PROTOCOL}://${DEV_HOST}:${DEV_SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      paths.indexPath,
    ],
  },
  output: {
    filename: '[name].js',
    path: paths.buildPath,
    publicPath: baseConfig.output.publicPath,
  },
  module: {
    rules: _.concat(baseConfig.module.rules, [{
      test: /\.js$/,
      loader: 'source-map-loader',
      enforce: 'pre',
    }])
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: paths.buildPath,
    publicPath: baseConfig.output.publicPath,
    hot: true,
    host: DEV_HOST,
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    proxy: {
      '**': {
        target: `${PROD_SERVER_PROTOCOL}://${PROD_HOST}:${PROD_SERVER_PORT}`,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: _.concat(baseConfig.plugins, [
    new webpack.SourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(DEV_ENV_NAME),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.ejs',
      template: path.resolve(paths.srcPath, 'views', 'index.ejs'),
      inject: 'body',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(paths.staticPath),
    }),
    new ExtractTextPlugin({
      disable: true
    })
  ]),
});

module.exports = config;
