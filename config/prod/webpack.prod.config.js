const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = require('../paths');
const baseConfig = require('../../webpack.config.js');

const config = _.merge(baseConfig, {
  output: {
    filename: '[name]-[hash].min.js',
    sourceMapFilename: '[name].map',
    publicPath: '/build/'
  },
  plugins: [
    new CleanWebpackPlugin('static/build', {
      root: paths.projectPath,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MinifyPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessorOptions: {
        discardComments: {
          minimize: true,
          removeAll: true
        },
      },
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(paths.staticPath, 'index.ejs'),
      template: path.resolve(paths.srcPath, 'views', 'index.ejs'),
      inject: 'body'
    }),
  ],
});

module.exports = config;
