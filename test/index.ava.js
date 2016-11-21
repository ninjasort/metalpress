import test from 'ava'
import path from 'path'
import fs from 'fs'
import metalpress from '../src'
import pmock from 'pmock'

let configPath, standardConfig, cwd

test.cb.before(t => {
  configPath = path.resolve(__dirname, './fixtures/standard/.metalpress')
  standardConfig = JSON.parse(fs.readFileSync(configPath, {encoding: 'utf-8'}))
  cwd = pmock.cwd(path.resolve(__dirname, './fixtures/standard'))
  t.end()
})

test.cb.after(t => {
  cwd.reset()
  t.end()
})

test('metalpress is a function', t => t.is(typeof metalpress, 'function'))

test.cb('metalpress overrides metadata when passing it in', t => {
  const configWithMetadata = Object.assign(standardConfig, {metadata: {title: 'Testing'}})
  const m = metalpress(configWithMetadata, (err) => {
    t.is(m.metadata().title, 'Testing')
    t.end()
  })
})

test.cb('metalpress basePath should resolve to an absolute path internally', t => {
  const m = metalpress(standardConfig, (err) => {
    const match = new RegExp(/\/metalpress\/test\//)
    t.truthy(m.metadata().basePath)
    t.regex(m.metadata().basePath, match, 'is a absolute path')
    t.end()
  })
})

test.cb('metalpress sets the correct metadata on collections', t => {
  const m = metalpress(standardConfig, (err) => {
    t.truthy(m.metadata().collections.posts)
    t.truthy(m.metadata().collections.posts[0].excerpt)
    t.end()
  })
})

test.cb('metalpress should have tags', t => {
  const m = metalpress(standardConfig, (err, files) => {
    const tags = fs.statSync(path.resolve(__dirname, 'fixtures/standard/dist/topics/dreaming/index.html'))
    t.is(tags.isFile(), true)
    t.end()
  })
})

test.cb('custom tags - should have proper modulo helper', t => {
  const helpers = require('../src/config/custom-tags').default
  t.is(helpers.modulo(4, 2), 0)
  t.end()
})

