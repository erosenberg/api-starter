const webpack = require('webpack');
const { merge, concat } = require('lodash');
const autoprefixer = require('autoprefixer');
const path = require('path');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const magicImporter = require('node-sass-magic-importer');
const convert = require('koa-connect');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// utils
const baseConfig = require('./webpack.config.js');
const paths = require('../paths');

const { API_URI } = process.env;

const serverConfig = {
  content: [__dirname],
  add: (app) => {
    // ... see: https://github.com/bripkens/connect-history-api-fallback#options
    const historyOptions = {
      logger: console.log.bind(console),
      verbose: true,
      index: baseConfig.output.publicPath,
      // disableDotRule: true,
    };
    app.use(convert(proxy('/api/**', {
      target: API_URI,
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
    })));
    app.use(convert(history(historyOptions)));
  },
};

const config = merge(baseConfig, {
  mode: 'development',
  context: __dirname,
  devtool: 'inline-source-map',
  entry: {
    bundle: ['react-hot-loader/patch', paths.indexPath],
  },
  output: {
    filename: '[name].js',
    path: paths.buildPath,
    publicPath: baseConfig.output.publicPath,
  },
  module: {
    rules: concat(baseConfig.module.rules, [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [autoprefixer('last 2 version')];
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              importer: magicImporter(),
            },
          },
        ],
      },
    ]),
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: concat(baseConfig.plugins, [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: path.resolve('static/favicon.png'),
      template: path.resolve('src/views', 'index.ejs'),
      inject: 'body',
    }),
  ]),
});

module.exports = config;
module.exports.serve = serverConfig;
