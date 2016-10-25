import path from 'path';
import { expect } from 'chai';
import configureWebpack, {
  omitWebpack,
  loadCustomWebpack
} from '../../src/config/configure-webpack';

describe('webpack configuration', () => {
  
  var config;
  beforeEach(() => {
    config = {
      basePath: __dirname
    };
  });

  describe('#configureWebpack', () => {

    it('should take a config return a new config with webpack dev, prod', () => {
      let newConfig = configureWebpack(config);
      expect(newConfig.dev).to.be.an('object');
      expect(newConfig.prod).to.be.an('object');
    });

    it('should override module.loaders completely', () => {
      var config = configureWebpack({
        basePath: path.resolve(__dirname, '../fixtures'),
        webpack: {
          dev: './webpack.config.js',
          prod: './webpack.config.js'
        }
      })
      expect(config.dev.module.loaders).to.have.lengthOf(0)
    });

    it('should keep original module.loaders in tact', () => {
      var config = configureWebpack({
        basePath: path.resolve(__dirname, '../fixtures'),
        bower: true,
        jquery: true
      })
      expect(config.dev.module.loaders).to.have.lengthOf(4)
    });

  });

  describe('#loadCustomWebpack', () => {

    it('should log error if config webpack paths are not defined', () => {
      const fn = () => { loadCustomWebpack(config) };
      expect(fn).to.throw(Error);
    });

    it('should load custom webpack configs when passed as a path', () => {
      config.webpack = {
        dev: '../fixtures/webpack.config',
        prod: '../fixtures/webpack.prod.config'
      };
      let webpackConfig = loadCustomWebpack(config);
      expect(webpackConfig.dev).to.be.an('object');
      expect(webpackConfig.prod).to.be.an('object');
    });

    it('should use the es6 default module if there is one', () => {
      config.webpack = {
        dev: '../fixtures/webpack.config.es6',
        prod: '../fixtures/webpack.prod.config.es6'
      };
      let webpackConfig = loadCustomWebpack(config);
      expect(webpackConfig.dev).to.not.include.keys('default');
      expect(webpackConfig.prod).to.not.include.keys('default');
    });

  });

  describe('#omitWebpack', () => {
    
    it('should omit the webpack config', () => {
      config.webpack = {
        dev: '../fixtures/webpack.config',
        prod: '../fixtures/webpack.prod.config'
      };
      expect(config.webpack).to.exist;
      let webpackConfig = loadCustomWebpack(config);
      expect(omitWebpack(config).webpack).to.be.undefined;
    });

  });


});