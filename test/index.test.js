import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import metalpress from '../src';
import prodConfig from './fixtures/production/config';
import equal from 'assert-dir-equal';
import assign from 'deep-assign';
import pmock from 'pmock';

describe('metalpress', () => {

  it('should be a function', () => {
    expect(metalpress).to.be.a('function');
  });

  describe('standard build', () => {
  
    const configPath = path.resolve(__dirname, './fixtures/standard/.metalpress');
    let standardConfig = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}));

    var cwd;
    before(() => {
      cwd = pmock.cwd(path.resolve(__dirname, './fixtures/standard'));
    })

    after(() => {
      cwd.reset();
    })

    it('should override metadata when passing it in', (done) => {
      const configWithMetadata = Object.assign(standardConfig, {metadata: {title: 'Testing'}});
      const m = metalpress(configWithMetadata, (err, files) => {
        expect(m.metadata().title).to.equal('Testing');
        done();
      });
    });

    it('should set correct metadata on collections', (done) => {
      const m = metalpress(standardConfig, (err, files) => {
        expect(m.metadata().collections.posts).to.be.ok;
        expect(m.metadata().collections.posts[0].excerpt).to.be.ok;
        done();
      })
    });

    it('should have tags', (done) => {
      const m = metalpress(standardConfig, (err, files) => {
        const tags = fs.statSync('test/fixtures/standard/dist/topics/dreaming/index.html');
        expect(tags.isFile()).to.be.true;
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
          expect(files['index.html'].preTemplateData).to.be.true;
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
          expect(files['index.html'].preTemplateData).to.be.true;
          done();
        });
      });

    });

  });

  describe('production build', () => {

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

    it('should include a robots.txt', (done) => {
      const m = metalpress(prodConfig, (err, files) => {
        const rss = fs.statSync('test/fixtures/production/dist/robots.txt');
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