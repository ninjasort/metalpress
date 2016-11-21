import test from 'ava'
import path from 'path'
import fs from 'fs'
import metalpress from '../src'
import pmock from 'pmock'

let configPath, standardConfig, cwd, addMeta

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

test.beforeEach(t => {
  addMeta = (data) => {
    return (files, metalsmith, next) => {
      for (const file in files) {
        files[file].preTemplateData = data
      }
      next()
    }
  }
})

test.cb('middleware should use preMiddleware', t => {
  const config = Object.assign({}, standardConfig, {
    preMiddleware: [
      addMeta(true)
    ]
  })
  const m = metalpress(config, (err, files) => {
    t.is(files['index.html'].preTemplateData, true)
    t.end()
  })
})

test.cb('should use postMiddleware', t => {
  const config = Object.assign({}, standardConfig, {
    postMiddleware: [
      addMeta(true)
    ]
  })
  const m = metalpress(config, (err, files) => {
    t.is(files['index.html'].preTemplateData, true)
    t.end()
  })
})

