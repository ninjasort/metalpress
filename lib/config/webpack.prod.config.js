'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  entry: _path2.default.resolve(__dirname, './src/assets/js/index.js'),
  output: {
    path: _path2.default.resolve(__dirname, './dist/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      exclude: /(node_modules|src\/lib|src\/assets\/js\/lib)/,
      loader: 'babel'
    }, { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' }, { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }]
  },
  resolveLoader: {
    root: _path2.default.join(__dirname, '../../node_modules')
  },
  plugins: [new _webpack2.default.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }), new _webpack2.default.optimize.OccurenceOrderPlugin(), new _webpack2.default.optimize.DedupePlugin()]
};