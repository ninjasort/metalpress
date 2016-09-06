import path from 'path';
import configureWebpack from '../src/config/configure-webpack';
import createDefaults from '../src/config/defaults';
import {
  expect
} from 'chai';

describe('webpack config', () => {
  
  it('should override module.loaders completely', function(done) {
    var config = configureWebpack({
      basePath: path.resolve(__dirname, './fixtures/webpack'),
      webpack: {
        dev: './webpack.config.js',
        prod: './webpack.config.js'
      }
    })
    expect(config.dev.module.loaders).to.have.lengthOf(0)
    done();
  });

  it('should keep original module.loaders in tact', function(done) {
    var config = configureWebpack({
      basePath: path.resolve(__dirname, './fixtures/webpack'),
      bower: true,
      jquery: true
    })
    expect(config.dev.module.loaders).to.have.lengthOf(4)
    done();
  });

  it('should create correct defaults without loaders', function(done) {
    var defaults = createDefaults({
      basePath: path.resolve(__dirname, './fixtures/webpack'),
      bower: true,
      jquery: true,
      webpack: {
        dev: './webpack.config.js',
        prod: './webpack.config.js'
      }
    })
    expect(defaults.webpack.dev.module.loaders).to.have.lengthOf(0)
    done();
  });

  it('should create correct defaults with default loaders', function(done) {
    var defaults = createDefaults({
      basePath: path.resolve(__dirname, './fixtures/webpack'),
      bower: true,
      jquery: true
    })
    expect(defaults.webpack.dev.module.loaders).to.have.lengthOf(4);
    done();
  });

})