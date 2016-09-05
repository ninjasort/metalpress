import path             from 'path';
import fs               from 'fs';
import Metalsmith       from 'metalsmith';
import deepAssign       from 'deep-assign';
import collections      from 'metalsmith-collections';
import metadata         from 'metalsmith-metadata';
import markdown         from 'metalsmith-markdown';
import layouts          from 'metalsmith-layouts';
import inPlace          from 'metalsmith-in-place';
import permalinks       from 'metalsmith-permalinks';
import pagination       from 'metalsmith-pagination';
import excerpts         from 'metalsmith-better-excerpts';
import sass             from 'metalsmith-sass';
import moment           from 'moment';
import define           from 'metalsmith-define';
import jekyllDates      from 'metalsmith-jekyll-dates';
import autoprefixer     from 'metalsmith-autoprefixer';
import webpack          from 'metalsmith-webpack';
import ignore           from 'metalsmith-ignore';
import metallic         from 'metalsmith-metallic';
import tags             from 'metalsmith-tags';
import snippet          from 'metalsmith-snippet';
import blc              from 'metalsmith-broken-link-checker';
import date             from 'metalsmith-build-date';
import robots           from 'metalsmith-robots';
import shortcodes       from 'metalsmith-flexible-shortcodes';

// prod
import htmlMinifier     from 'metalsmith-html-minifier';
import fingerprint      from 'metalsmith-fingerprint';
import imagemin         from 'metalsmith-imagemin';
import sitemap          from 'metalsmith-sitemap';
import firebase, {
  transform
} from 'metalsmith-firebase';
import rss              from 'metalsmith-rss';
import drafts           from 'metalsmith-drafts';

import createDefaults   from './config/defaults';
import {
  _fixPaginationQuirk,
  _fixPaginationObject
} from './helpers';

export default function (config = {}, callback) {

  let options = createDefaults(config);

  // Config
  // --------------------------------------------------------------------------
  const m = new Metalsmith(options.basePath);

  // Metalsmith options
  // --------------------------------------------------------------------------
  m.clean(true);
  m.destination(config.destination || 'dist');

  // Object Metadata
  // --------------------------------------------------------------------------
  m.metadata(options.metadata);

  // File Metadata
  // --------------------------------------------------------------------------
  m.use(metadata(options.filedata));
  
  // Shortcodes
  // --------------------------------------------------------------------------
  if (options.shortcodes) {
    m.use(shortcodes(options.shortcodes));
  }

  // Build Date
  // --------------------------------------------------------------------------
  m.use(date({ key: 'dateBuilt' }));

  // Firebase
  // --------------------------------------------------------------------------
  if (options.firebase) {
    m.use(firebase(options.firebase));
    m.use(transform(options.firebase));
  }

  // Ignores
  // --------------------------------------------------------------------------
  m.use(ignore(options.ignore));

  // Drafts
  // --------------------------------------------------------------------------
  if (m.metadata().production) {
    m.use(drafts());
  }

  // Definitions
  // --------------------------------------------------------------------------
  m.use(define({ moment }));

  // Date
  // --------------------------------------------------------------------------
  m.use(jekyllDates());

  // Tags
  // --------------------------------------------------------------------------
  if (options.tags) {
    m.use(tags(options.tags));
  }

  // Code Highlighting
  // --------------------------------------------------------------------------
  m.use(metallic());

  // Markdown
  // --------------------------------------------------------------------------
  m.use(markdown(options.markdown));

  // Excerpts
  // --------------------------------------------------------------------------
  m.use(excerpts(options.excerpts));

  // Attach Collections
  // --------------------------------------------------------------------------
  m.use(collections(options.collections));
  
  // Pagination
  // --------------------------------------------------------------------------
  if (options.pagination) {
    _fixPaginationQuirk(config);
    m.use(pagination(options.pagination));
    m.use(_fixPaginationObject(config));
  }

  // Permalinks
  // --------------------------------------------------------------------------
  m.use(permalinks(options.permalinks));

  // Styles
  // --------------------------------------------------------------------------
  if (m.metadata().production) {
    options.sass.outputStyle = 'compressed';
    options.sass.sourceMap = false;
    options.sass.sourceMapEmbed = false;
    m.use(sass(options.sass));
  } else {
    m.use(sass(options.sass));
  }
  m.use(autoprefixer({ browsers: ['last 2 versions'] }));

  // Fingerprinting
  // --------------------------------------------------------------------------
  if (options.fingerprint) {
    m.use(fingerprint(options.fingerprint));
  }

  // Post-template Middleware
  // --------------------------------------------------------------------------
  if (options.preMiddleware) {
    for (const plugin in options.preMiddleware) {
      if (options.preMiddleware[plugin]) {
        m.use(options.preMiddleware[plugin]);
      }
    }
  }

  // Templates
  // --------------------------------------------------------------------------
  m.use(layouts(options.layouts));
  m.use(inPlace(options.inPlace));

  // Js
  // --------------------------------------------------------------------------
  if (options.webpack) {
    if (m.metadata().production) {
      m.use(webpack(options.webpack.prod));
    } else {
      m.use(webpack(options.webpack.dev));
    }
  }

  // Sitemap
  // --------------------------------------------------------------------------
  if (m.metadata().production && options.sitemap) {
    m.use(sitemap(options.sitemap));
  }

  // Robots
  // --------------------------------------------------------------------------
  if (options.robots) {
    m.use(robots(options.robots));
  }

  // RSS Feed
  // --------------------------------------------------------------------------
  if (options.rss) {
    if (m.metadata().production) {
      m.use(rss(options.rss));
    }
  }

  // Production
  // --------------------------------------------------------------------------
  if (m.metadata().production) {
    m.use(imagemin(options.imagemin));
    m.use(htmlMinifier('*.html', options.htmlMinifier));
  }

  // Post-template Middleware
  // --------------------------------------------------------------------------
  if (options.postMiddleware) {
    for (const plugin in options.postMiddleware) {
      if (options.postMiddleware[plugin]) {
        m.use(options.postMiddleware[plugin]);
      }
    }
  }

  m.build(callback);

  return m;

}