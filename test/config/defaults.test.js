import path from 'path';
import createDefaults from '../../src/config/defaults';
import {
  expect
} from 'chai';

describe('#createDefaults', () => {

  it('should create correct defaults without loaders', () => {
    var defaults = createDefaults({
      basePath: path.resolve(__dirname, '../fixtures/webpack'),
      bower: true,
      jquery: true,
      webpack: {
        dev: './webpack.config.js',
        prod: './webpack.config.js'
      }
    })
    expect(defaults.webpack.dev.module.loaders).to.have.lengthOf(0)
  });

  it('should create correct defaults with default loaders', () => {
    var defaults = createDefaults({
      basePath: path.resolve(__dirname, '../fixtures/webpack'),
      bower: true,
      jquery: true
    });
    expect(defaults.webpack.dev.module.loaders).to.have.lengthOf(4);
  });

});