const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const paths = require('../paths');
const baseConfig = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const {
  DEV_SERVER_PORT,
  API_SERVER_PORT,
  SERVER_HOST,
  SERVER_PROTOCOL,
} = process.env;

const config = _.merge(baseConfig, {
  entry: {
    bundle: [
      `webpack-dev-server/client?${SERVER_PROTOCOL}://${SERVER_HOST}:${DEV_SERVER_PORT}`,
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
    }]),
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: paths.buildPath,
    publicPath: baseConfig.output.publicPath,
    hot: true,
    host: SERVER_HOST,
    port: DEV_SERVER_PORT,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: `${SERVER_PROTOCOL}://${SERVER_HOST}:${API_SERVER_PORT}`,
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api' },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: _.concat(baseConfig.plugins, [
    new webpack.EnvironmentPlugin({
      DEV_SERVER_PORT,
    }),
    new webpack.SourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(paths.srcPath, 'views', 'index.ejs'),
      inject: 'body',
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(paths.buildPath),
    }),
    new ExtractTextPlugin({
      disable: true,
    }),
    new DashboardPlugin(),
  ]),
});

module.exports = config;
