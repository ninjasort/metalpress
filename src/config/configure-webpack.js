require("babel-register", {
  presets: [
    'es2015',
    'stage-0'
  ]
});

import path from 'path';
import fs from 'fs';
import defaultWebpackDev from './webpack.config';
import defaultWebpackProd from './webpack.prod.config';
import BowerWebpackPlugin from 'bower-webpack-plugin';
import deepAssign from 'deep-assign';

export function loadCustomWebpack(config) {
  const custom = {};
  try {

    // attempt to load custom config
    custom.dev = require(path.resolve(config.basePath, config.webpack.dev));
    if (custom.dev.default) {
      custom.dev = custom.dev.default;
    }
    custom.prod = require(path.resolve(config.basePath, config.webpack.prod));
    if (custom.prod.default) {
      custom.prod = custom.prod.default;
    }
    custom.dev.resolve = {
      root: [
        path.resolve(config.basePath, 'node_modules'),
        path.resolve(config.basePath, 'src/lib')
      ]
    };
    custom.prod.resolve = {
      root: [
        path.resolve(config.basePath, 'node_modules'),
        path.resolve(config.basePath, 'src/lib')
      ]
    };
    return custom;

  } catch (e) {
    
    if (!config.webpack) {
      throw new Error(`Could not load custom webpack config. ${e}`);
      return {};
    }
    if (!config.webpack.dev) {
      console.log(`Did not specify path to 'webpack.dev'.`);
    }
    if (!config.webpack.prod) {
      console.log(`Did not specify path to 'webpack.prod'.`);
    }
    return {};

  }
}

export default function (config) {
  
  if (!config.basePath) {
    throw new Error('Did not define config.basePath');
  }

  var bundle = {
    entry: path.resolve(config.basePath, './src/assets/js/index.js'),
    output: {
      path: path.resolve(config.basePath, './dist/assets/js')
    }
  };
  
  // attempt custom webpack config
  var customWebpack = {};
  if (config.webpack) {
    customWebpack = loadCustomWebpack(config);
  }

  // jquery configuration
  if (config.jquery) {
    defaultWebpackDev.externals = defaultWebpackProd.externals = {
      'jquery': 'jQuery'
    }
  }

  // plugins (bower-webpack-plugin)
  if (config.bower) {
    try {

      if (!defaultWebpackDev.plugins || !defaultWebpackDev.plugins.length) {
        defaultWebpackDev.plugins = [];
      }
      if (!defaultWebpackProd.plugins || !defaultWebpackProd.plugins.length) {
        defaultWebpackProd.plugins = [];
      }
      var bowerConfig = new BowerWebpackPlugin({
        modulesDirectories: ['src/lib'],
        manifestFiles: 'bower.json'
      });
      defaultWebpackDev.plugins.push(bowerConfig);
      defaultWebpackProd.plugins.push(bowerConfig);
    } catch (e) { throw new Error(e); }
  }
  
  // return webpack configuration
  return {
    dev: Object.assign(
      {}, 
      defaultWebpackDev,
      bundle,
      customWebpack.dev
    ),
    prod: Object.assign(
      {}, 
      defaultWebpackProd,
      bundle,
      customWebpack.prod
    )
  };
  
}

export function omitWebpack (config) {
  var newConfig = {};
  for (let c in config) {
    if (c !== 'webpack') {
      newConfig[c] = config[c];
    }
  }
  return newConfig;
}