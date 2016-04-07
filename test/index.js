import { expect } from 'chai';
import sinon from 'sinon';
import metalpress from '../src';
import testConfig from './fixtures/test-config';
import equal from 'assert-dir-equal';

describe('metalpress', () => {

  it('should be a function', () => {
    expect(metalpress).to.be.a('function');
  });

  it('should work with DEFAULT_OPTIONS', (done) => {
    const options = metalpress(testConfig, (err, files) => {

      expect(options.title).to.equal('MetalPress');
      equal('test/fixtures/dist', 'test/fixtures/expected');

      done();
    });
  });

});