import path from 'path'
import fs from 'fs';
// import webpack from 'webpack'
// import webpackConfig from '../webpack.config.babel';
// import webpackProdConfig from '../webpack.config.prod.babel'
// import customTags from './customtags';

export default {

  basePath: process.cwd() + '/test/fixtures',

  firebase: {
    url: 'https://axisdefined.firebaseio.com'
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
  // pagination: {
  //   'collections.posts': {
  //     perPage: 5,
  //     first: 'blog/index.html',
  //     path: 'blog/:num/index.html',
  //     noPageOne: true,
  //     layout: 'blog.liquid'
  //   }
  // },

  rss: {
    feedOptions: {
      title: 'New Site',
      site_url: 'http://testsite.com'
    }
  },

  sitemap: {
    hostname: 'http://testsite.com'
  },

  webpack: false,
  // webpack: webpackConfig,
  // webpackProd: webpackProdConfig,

};
