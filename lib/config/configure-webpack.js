'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (config) {
  var bundle = {
    entry: _path2.default.resolve(config.basePath, './src/assets/js/index.js'),
    output: {
      path: _path2.default.resolve(config.basePath, './dist/assets/js')
    }
  };

  // attempt custom webpack config
  var customWebpack = {};
  if (config.webpack) {
    customWebpack = loadCustomWebpack(config);
  } else {
    console.log('\t Info: Using metalpress default webpack config...');
  }

  // jquery configuration
  if (config.jquery) {
    _webpack2.default.externals = _webpackProd2.default.externals = {
      'jquery': 'jQuery'
    };

    console.log('\t Info: Using jQuery from external source entry...');
  }

  // plugins (bower-webpack-plugin)
  if (config.bower) {
    try {

      if (!_webpack2.default.plugins || !_webpack2.default.plugins.length) {
        _webpack2.default.plugins = [];
      }
      if (!_webpackProd2.default.plugins || !_webpackProd2.default.plugins.length) {
        _webpackProd2.default.plugins = [];
      }
      var bowerConfig = new _bowerWebpackPlugin2.default({
        modulesDirectories: ['src/lib'],
        manifestFiles: 'bower.json'
      });
      _webpack2.default.plugins.push(bowerConfig);
      _webpackProd2.default.plugins.push(bowerConfig);

      console.log('\t Info: Using bower packages from "src/lib" specified in bower.json...');
    } catch (e) {
      console.error(e);
    }
  }

  // return webpack configuration
  return {
    dev: Object.assign({}, _webpack2.default, bundle, customWebpack.dev),
    prod: Object.assign({}, _webpackProd2.default, bundle, customWebpack.prod)
  };
};

exports.omitWebpack = omitWebpack;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _webpack = require('./webpack.config');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackProd = require('./webpack.prod.config');

var _webpackProd2 = _interopRequireDefault(_webpackProd);

var _bowerWebpackPlugin = require('bower-webpack-plugin');

var _bowerWebpackPlugin2 = _interopRequireDefault(_bowerWebpackPlugin);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("babel-register", {
  presets: ['es2015', 'stage-0']
});

function loadCustomWebpack(config) {
  var custom = {};
  try {
    // attempt to load custom config
    custom.dev = require(_path2.default.resolve(config.basePath, config.webpack.dev)).default;
    custom.prod = require(_path2.default.resolve(config.basePath, config.webpack.prod)).default;
    custom.dev.resolve = {
      root: [_path2.default.resolve(config.basePath, 'node_modules'), _path2.default.resolve(config.basePath, 'src/lib')]
    };
    custom.prod.resolve = {
      root: [_path2.default.resolve(config.basePath, 'node_modules'), _path2.default.resolve(config.basePath, 'src/lib')]
    };

    console.log('\t Info: Using custom webpack config...');

    return custom;
  } catch (e) {
    console.error('Could not load custom webpack config. ' + e);
    if (!config.webpack.dev) {
      console.error('Did not specify path to \'webpack.dev\'.');
    }
    if (!config.webpack.prod) {
      console.error('Did not specify path to \'webpack.prod\'.');
    }
    return {};
  }
}

function omitWebpack(config) {
  var newConfig = {};
  for (var c in config) {
    if (c !== 'webpack') {
      newConfig[c] = config[c];
    }
  }
  return newConfig;
}