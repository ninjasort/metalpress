import test from 'ava'
import sinon from 'sinon'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import metalpress from '../src'
import equal from 'assert-dir-equal'
import assign from 'deep-assign'
import pmock from 'pmock'

let configPath, prodConfig, cwd

test.cb.before(t => {
  configPath = path.resolve(__dirname, './fixtures/production/.metalpress')
  prodConfig = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}))
  cwd = pmock.cwd(path.resolve(__dirname, './fixtures/production'))
  t.end()
})

test.cb('should build sitemap.xml file', t => {
  const m = metalpress(prodConfig, (err, files) => {
    const sitemap = fs.statSync(path.resolve(__dirname, 'fixtures/production/dist/sitemap.xml'))
    t.is(sitemap.isFile(), true)
    t.end()
  })
})

test.cb('should build an rss.xml file', t => {
  const m = metalpress(prodConfig, (err, files) => {
    const rss = fs.statSync(path.resolve(__dirname, 'fixtures/production/dist/rss.xml'))
    t.is(rss.isFile(), true)
    t.end()
  })
})

test.cb('should include a robots.txt', t => {
  const m = metalpress(prodConfig, (err, files) => {
    const rss = fs.statSync(path.resolve(__dirname, 'fixtures/production/dist/robots.txt'))
    t.is(rss.isFile(), true)
    t.end()
  })
})

test.cb('should remove sourcemaps in js and css', t => {
  const m = metalpress(prodConfig, (err, files) => {
    equal(path.resolve(__dirname, 'fixtures/production/dist/assets'), path.resolve(__dirname, 'fixtures/production/expected/assets'))
    try {
      const cssSourceMap = fs.statSync(path.resolve(__dirname, 'fixtures/production/dist/assets/css/main.css.map'))
    } catch (e) {
      // no file
      t.is(e.code, 'ENOENT')
    }
    t.end()
  })
})

