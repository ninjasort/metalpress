import path                    from 'path';
import deepAssign              from 'deep-assign';
import customTags              from './custom-tags';
import configureWebpack        from './configure-webpack';

export default function createDefaults(config) {

  var webpack = configureWebpack(config);
  console.log(webpack);

  var DEFAULTS = {
  
    metadata: {
      title: 'Metalpress',
      description: 'Create a blog with Metalpress.',
      url: 'https://metalpress.io',
      production: false
    },
    
    filedata: false,
    
    sitemap: false,
    
    shortcodes: false,
    
    rss: false,

    robots: {
      'disallow': ['404.html', '/assets/img'],
      'sitemap': 'https://metalpress.io/sitemap.xml'
    },
    
    ignore: [
      'data/**',
      '_data/**',
      '_drafts/*.md',
      'templates/**',
      'lib/**',
      'lib/**/.gitignore',
      'lib/**/.bower.json',
      'lib/**/.jshintrc',
      'assets/js/**/!(.min).js'
    ],
    
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
      filters: customTags
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
    
    webpack

  };

  return deepAssign({}, DEFAULTS, config);

}