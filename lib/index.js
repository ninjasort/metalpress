'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var callback = arguments[1];


  var options = (0, _defaults2.default)(config);

  // Config
  // --------------------------------------------------------------------------
  var m = new _metalsmith2.default(options.basePath);

  // Metalsmith options
  // --------------------------------------------------------------------------
  m.clean(true);
  m.destination(config.destination || 'dist');

  // Object Metadata
  // --------------------------------------------------------------------------
  m.metadata(options.metadata);

  // File Metadata
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithMetadata2.default)(options.filedata));

  // Add env variables to metadata
  m.use((0, _metalsmithEnv2.default)());

  // Build Date
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithBuildDate2.default)({ key: 'dateBuilt' }));

  // Ignores
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithIgnore2.default)(options.ignore));

  // Definitions
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithDefine2.default)({ moment: _moment2.default }));

  // Date
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithJekyllDates2.default)());

  // Tags
  // --------------------------------------------------------------------------
  if (options.tags) {
    m.use((0, _metalsmithTags2.default)(options.tags));
  }

  // Code Highlighting
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithMetallic2.default)());

  // Markdown
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithMarkdown2.default)(options.markdown));

  // Excerpts
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithBetterExcerpts2.default)(options.excerpts));

  // Attach Collections
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithCollections2.default)(options.collections));

  // Pagination
  // --------------------------------------------------------------------------
  if (options.pagination) {
    (0, _helpers._fixPaginationQuirk)(config);
    m.use((0, _metalsmithPagination2.default)(options.pagination));
    m.use((0, _helpers._fixPaginationObject)(config));
  }

  // Permalinks
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithPermalinks2.default)(options.permalinks));

  // Styles
  // --------------------------------------------------------------------------
  if (m.metadata().production) {
    options.sass.outputStyle = 'compressed';
    options.sass.sourceMap = false;
    options.sass.sourceMapEmbed = false;
    m.use((0, _metalsmithSass2.default)(options.sass));
  } else {
    m.use((0, _metalsmithSass2.default)(options.sass));
  }
  m.use((0, _metalsmithAutoprefixer2.default)({ browsers: ['last 2 versions'] }));

  // Fingerprinting
  // --------------------------------------------------------------------------
  if (options.fingerprint) {
    m.use((0, _metalsmithFingerprint2.default)(options.fingerprint));
  }

  // Post-template Middleware
  // --------------------------------------------------------------------------
  if (options.preMiddleware) {
    for (var plugin in options.preMiddleware) {
      if (options.preMiddleware[plugin]) {
        m.use(options.preMiddleware[plugin]);
      }
    }
  }

  // Templates
  // --------------------------------------------------------------------------
  m.use((0, _metalsmithLayouts2.default)(options.layouts));
  m.use((0, _metalsmithInPlace2.default)(options.inPlace));

  // Js
  // --------------------------------------------------------------------------
  if (options.webpack) {
    if (m.metadata().production) {
      m.use((0, _metalsmithWebpack2.default)(options.webpack.prod));
    } else {
      m.use((0, _metalsmithWebpack2.default)(options.webpack.dev));
    }
  }

  // Sitemap
  // --------------------------------------------------------------------------
  if (m.metadata().production && options.sitemap) {
    m.use((0, _metalsmithSitemap2.default)(options.sitemap));
  }

  // Robots
  // --------------------------------------------------------------------------
  if (options.robots) {
    m.use((0, _metalsmithRobots2.default)(options.robots));
  }

  // RSS Feed
  // --------------------------------------------------------------------------
  if (options.rss) {
    if (m.metadata().production) {
      m.use((0, _metalsmithRss2.default)(options.rss));
    }
  }

  // Production
  // --------------------------------------------------------------------------
  if (m.metadata().production) {
    m.use((0, _metalsmithImagemin2.default)(options.imagemin));
    m.use((0, _metalsmithHtmlMinifier2.default)('*.html', options.htmlMinifier));
  }

  // Post-template Middleware
  // --------------------------------------------------------------------------
  if (options.postMiddleware) {
    for (var _plugin in options.postMiddleware) {
      if (options.postMiddleware[_plugin]) {
        m.use(options.postMiddleware[_plugin]);
      }
    }
  }

  m.build(callback);

  return m;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

var _metalsmithEnv = require('metalsmith-env');

var _metalsmithEnv2 = _interopRequireDefault(_metalsmithEnv);

var _metalsmithCollections = require('metalsmith-collections');

var _metalsmithCollections2 = _interopRequireDefault(_metalsmithCollections);

var _metalsmithMetadata = require('metalsmith-metadata');

var _metalsmithMetadata2 = _interopRequireDefault(_metalsmithMetadata);

var _metalsmithMarkdown = require('metalsmith-markdown');

var _metalsmithMarkdown2 = _interopRequireDefault(_metalsmithMarkdown);

var _metalsmithLayouts = require('metalsmith-layouts');

var _metalsmithLayouts2 = _interopRequireDefault(_metalsmithLayouts);

var _metalsmithInPlace = require('metalsmith-in-place');

var _metalsmithInPlace2 = _interopRequireDefault(_metalsmithInPlace);

var _metalsmithPermalinks = require('metalsmith-permalinks');

var _metalsmithPermalinks2 = _interopRequireDefault(_metalsmithPermalinks);

var _metalsmithPagination = require('metalsmith-pagination');

var _metalsmithPagination2 = _interopRequireDefault(_metalsmithPagination);

var _metalsmithBetterExcerpts = require('metalsmith-better-excerpts');

var _metalsmithBetterExcerpts2 = _interopRequireDefault(_metalsmithBetterExcerpts);

var _metalsmithSass = require('metalsmith-sass');

var _metalsmithSass2 = _interopRequireDefault(_metalsmithSass);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _metalsmithDefine = require('metalsmith-define');

var _metalsmithDefine2 = _interopRequireDefault(_metalsmithDefine);

var _metalsmithJekyllDates = require('metalsmith-jekyll-dates');

var _metalsmithJekyllDates2 = _interopRequireDefault(_metalsmithJekyllDates);

var _metalsmithAutoprefixer = require('metalsmith-autoprefixer');

var _metalsmithAutoprefixer2 = _interopRequireDefault(_metalsmithAutoprefixer);

var _metalsmithWebpack = require('metalsmith-webpack');

var _metalsmithWebpack2 = _interopRequireDefault(_metalsmithWebpack);

var _metalsmithIgnore = require('metalsmith-ignore');

var _metalsmithIgnore2 = _interopRequireDefault(_metalsmithIgnore);

var _metalsmithMetallic = require('metalsmith-metallic');

var _metalsmithMetallic2 = _interopRequireDefault(_metalsmithMetallic);

var _metalsmithTags = require('metalsmith-tags');

var _metalsmithTags2 = _interopRequireDefault(_metalsmithTags);

var _metalsmithSnippet = require('metalsmith-snippet');

var _metalsmithSnippet2 = _interopRequireDefault(_metalsmithSnippet);

var _metalsmithBrokenLinkChecker = require('metalsmith-broken-link-checker');

var _metalsmithBrokenLinkChecker2 = _interopRequireDefault(_metalsmithBrokenLinkChecker);

var _metalsmithBuildDate = require('metalsmith-build-date');

var _metalsmithBuildDate2 = _interopRequireDefault(_metalsmithBuildDate);

var _metalsmithRobots = require('metalsmith-robots');

var _metalsmithRobots2 = _interopRequireDefault(_metalsmithRobots);

var _metalsmithHtmlMinifier = require('metalsmith-html-minifier');

var _metalsmithHtmlMinifier2 = _interopRequireDefault(_metalsmithHtmlMinifier);

var _metalsmithFingerprint = require('metalsmith-fingerprint');

var _metalsmithFingerprint2 = _interopRequireDefault(_metalsmithFingerprint);

var _metalsmithImagemin = require('metalsmith-imagemin');

var _metalsmithImagemin2 = _interopRequireDefault(_metalsmithImagemin);

var _metalsmithSitemap = require('metalsmith-sitemap');

var _metalsmithSitemap2 = _interopRequireDefault(_metalsmithSitemap);

var _metalsmithRss = require('metalsmith-rss');

var _metalsmithRss2 = _interopRequireDefault(_metalsmithRss);

var _defaults = require('./config/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }