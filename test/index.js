import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import metalpress from '../src';
import standardConfig from './fixtures/standard/config';
import prodConfig from './fixtures/production/config';
import equal from 'assert-dir-equal';
import assign from 'deep-assign';

describe('metalpress', () => {

  it('should be a function', () => {
    expect(metalpress).to.be.a('function');
  });

  describe('standard build', () => {

    it('should set correct global metadata by default', (done) => {
      const m = metalpress(standardConfig, (err, files) => {
        expect(m.metadata().production).to.be.false;
        expect(m.metadata().title).to.equal('Metalpress');
        expect(m.metadata().description).to.equal('Create a blog with Metalpress.');
        done();
      });
    });

    it('should have tags', (done) => {
      const m = metalpress(standardConfig, (err, files) => {
        const tags = fs.statSync('test/fixtures/standard/dist/topics/dreaming/index.html');
        expect(tags.isFile()).to.be.true;
        done();
      });
    });

    // TODO: Fix this test for travis
    xit('should work with DEFAULT_OPTIONS', (done) => {
      const m = metalpress(standardConfig, (err, files) => {
        equal('test/fixtures/standard/dist', 'test/fixtures/standard/expected');
        done();
      });
    });

    describe('middleware', () => {
      
      let addMeta;
      beforeEach(() => {
        addMeta = (data) => {
          return (files, metalsmith, next) => {
            for (const file in files) {
              files[file].preTemplateData = data;
            }
            next();
          };
        };
      });

      it('should use preMiddleware', (done) => {
        const config = Object.assign({}, standardConfig, {
          preMiddleware: [
            addMeta(true)
          ]
        });
        const m = metalpress(config, (err, files) => {
          expect(files['home/index.html'].preTemplateData).to.be.true;
          done();
        });
      });

      it('should use postMiddleware', (done) => {
        const config = Object.assign({}, standardConfig, {
          postMiddleware: [
            addMeta(true)
          ]
        });
        const m = metalpress(config, (err, files) => {
          expect(files['home/index.html'].preTemplateData).to.be.true;
          done();
        });
      });

    });

  });

  describe('production build', () => {

    it('should override global metadata when passed in config', (done) => {
      const m = metalpress(prodConfig, (err, files) => {
        expect(m.metadata().production).to.be.true;
        expect(m.metadata().title).to.equal('New Blog');
        expect(m.metadata().description).to.equal('Taylor Imma let you finish.. but..');
        done();
      });
    });

    it('should build sitemap.xml file', (done) => {
      const m = metalpress(prodConfig, (err, files) => {
        const sitemap = fs.statSync('test/fixtures/production/dist/sitemap.xml');
        expect(sitemap.isFile()).to.be.true;
        done();
      });
    });

    it('should build an rss.xml file', (done) => {
      const m = metalpress(prodConfig, (err, files) => {
        const rss = fs.statSync('test/fixtures/production/dist/rss.xml');
        expect(rss.isFile()).to.be.true;
        done();
      });
    });

    it('should remove sourcemaps in js and css', (done) => {
      const m = metalpress(prodConfig, (err, files) => {
        equal('test/fixtures/production/dist/assets', 'test/fixtures/production/expected/assets');
        try {
          const cssSourceMap = fs.statSync('test/fixtures/production/dist/assets/css/main.css.map');
        } catch (e) {
          // no file
          expect(e.code).to.equal('ENOENT');
        }
        done();
      });
    });

  });

});