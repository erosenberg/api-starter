const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./config/paths');

const config = {
  entry: {
    bundle: ["babel-polyfill", paths.indexPath],
  },
  output: {
    filename: 'bundle.js',
    path: paths.buildPath,
    publicPath: '/static/build/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: [paths.nodeModulesPath],
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        //resolve-url-loader may be chained before sass-loader if necessary
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /.(png|jpg|jpeg|gif|svg)$/,
      exclude: [paths.nodeModulesPath],
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]-[hash].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};

module.exports = config;
