import path from 'path';
import fs from 'fs';
import webpackProdConfig from './webpack.config.prod.babel'

export default {

  basePath: `${process.cwd()}/test/fixtures/production`,

  metadata: {
    title: 'New Blog',
    description: 'Taylor Imma let you finish.. but..',
    production: true
  },

  filedata: {
    site: '_data/config.yaml'
  },

  firebase: {
    url: 'https://axisdefined.firebaseio.com'
  },

  fingerprint: {
    pattern: 'assets/css/main.css'
  },

  collections: {
    pages: {
      pattern: 'pages/*.md'
    },
    posts: {
      pattern: 'posts/!(index).md',
      sortBy: 'date',
      reverse: true
    }
  },

  permalinks: {
    relative: false,
    linksets: [{
      match: { collection: 'pages' },
      pattern: ':title'
    }, {
      match: { collection: 'posts' },
      pattern: ':date/:title'
    }]
  },

  pagination: false,

  rss: {
    feedOptions: {
      title: 'New Site',
      site_url: 'http://testsite.com'
    }
  },

  sitemap: {
    hostname: 'http://testsite.com'
  },

  webpack: {
    prod: webpackProdConfig
  }

};
