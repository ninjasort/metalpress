import path from 'path';
import fs from 'fs';

export default {

  basePath: `${process.cwd()}/test/fixtures/standard`,

  filedata: {
    site: '_data/config.yaml'
  },

  firebase: {
    url: 'https://axisdefined.firebaseio.com'
  },

  collections: {
    pages: {
      pattern: 'pages/*.html'
    },
    posts: {
      pattern: 'posts/!(index).html',
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

  webpack: false

};
