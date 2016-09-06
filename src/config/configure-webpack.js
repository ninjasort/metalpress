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
import UI from '../models/ui';

function loadCustomWebpack(ui, config) {
  const custom = {};
  try {
    // attempt to load custom config
    custom.dev = require(path.resolve(config.basePath, config.webpack.dev)).default;
    custom.prod = require(path.resolve(config.basePath, config.webpack.prod)).default;
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
    
    ui.writeInfo('Using custom webpack config...');

    return custom;
  } catch (e) {
    ui.writeError(`Could not load custom webpack config. ${e}`);
    if (!config.webpack.dev) {
      ui.writeError(`Did not specify path to 'webpack.dev'.`);
    }
    if (!config.webpack.prod) {
      ui.writeError(`Did not specify path to 'webpack.prod'.`);
    }
    return {};
  }
}

export default function (config) {
  
  const ui = new UI();
  var bundle = {
    entry: path.resolve(config.basePath, './src/assets/js/index.js'),
    output: {
      path: path.resolve(config.basePath, './dist/assets/js')
    }
  };
  
  // attempt custom webpack config
  var customWebpack = {};
  if (config.webpack) {
    customWebpack = loadCustomWebpack(ui, config);
  } else {
    ui.writeInfo('Using metalpress default webpack config...');
  }

  // jquery configuration
  if (config.jquery) {
    defaultWebpackDev.externals = defaultWebpackProd.externals = {
      'jquery': 'jQuery'
    }
    
    ui.writeInfo('Using jQuery from external source entry...');
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

      ui.writeInfo('Using bower packages from "src/lib" specified in bower.json...');
    } catch (e) { ui.writeError(e) }
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