'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createDefaults;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _customTags = require('./custom-tags');

var _customTags2 = _interopRequireDefault(_customTags);

var _configureWebpack = require('./configure-webpack');

var _configureWebpack2 = _interopRequireDefault(_configureWebpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDefaults(config) {

  var webpack = (0, _configureWebpack2.default)(config);
  var configNoWebpack = (0, _configureWebpack.omitWebpack)(config);

  var DEFAULTS = {

    metadata: {
      production: false
    },

    filedata: false,

    sitemap: false,

    rss: false,

    robots: {
      'disallow': ['404.html', '/assets/img'],
      'sitemap': 'https://metalpress.io/sitemap.xml'
    },

    ignore: ['data/**', '_data/**', '_drafts/*.md', 'templates/**', 'lib/**', 'lib/**/.gitignore', 'lib/**/.bower.json', 'lib/**/.jshintrc', 'assets/js/**/!(.min).js'],

    markdown: {
      gfm: true,
      tables: true
    },

    permalinks: {
      relative: false
    },

    layouts: {
      engine: 'liquid',
      directory: 'templates/_layouts',
      includeDir: 'templates/_includes',
      filters: _customTags2.default
    },

    inPlace: {
      engine: 'liquid',
      pattern: '**/*.liquid',
      includeDir: 'templates/_includes'
    },

    fingerprint: {
      pattern: 'assets/css/main.css'
    },

    tags: {
      // yaml key for tag list in you pages
      handle: 'tags',
      // path for result pages
      path: 'topics/:tag.html',
      // layout to use for tag listing
      layout: 'tag.liquid',
      // provide posts sorted by 'date' (optional)
      sortBy: 'date',
      // sort direction (optional)
      reverse: true,
      // skip updating metalsmith's metadata object.
      // useful for improving performance on large blogs (optional)
      skipMetadata: false,
      // Any options you want to pass to the [slug](https://github.com/dodo/node-slug) package.
      // Can also supply a custom slug function.
      // slug: function(tag) { return tag.toLowerCase() }
      slug: {
        mode: 'rfc3986'
      }
    },

    excerpts: {
      pruneLength: 80
    },

    sass: {
      outputDir: 'assets/css',
      sourceMap: true,
      sourceMapEmbed: true
    },

    imagemin: {
      optimizationLevel: 4,
      progressive: true
    },

    htmlMinifier: {
      removeComments: false,
      removeEmptyAttributes: false
    },

    preMiddleware: false,
    postMiddleware: false,

    webpack: webpack

  };

  return (0, _deepAssign2.default)({}, DEFAULTS, configNoWebpack);
}