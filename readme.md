# metalpress [![npm](https://img.shields.io/npm/v/metalpress.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/metalpress) [![Travis](https://img.shields.io/travis/cameronroe/metalpress.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/cameronroe/metalpress) [![Codecov](https://img.shields.io/codecov/c/github/cameronroe/metalpress.svg?maxAge=2592000?style=flat-square)](https://codecov.io/gh/cameronroe/metalpress) 

> Create a blog easily with Metalsmith.

An opinionated boilerplate for quickly creating a blog with [Metalsmith](https://github.com/metalsmith/metalsmith).

## Features

- Liquid Templating
- Markdown Rendering
- Permalinks
- Pagination
- Firebase Data Integration
- Webpack Bundling
- RSS & Sitemap Support
- Imagemin, Code Highlighting, Html Minification

## Installation

```
$ npm install metalpress --save
```

## Usage

To get started with metalpress, simply create a `metalpress.config.js` and add the configuration needed.

```js
import path from 'path';
import webpackConfig from './webpack.config.babel';
import webpackProdConfig from './webpack.config.prod.babel';

export default {

  basePath: path.resolve(__dirname, '.'),

  metadata: {
    title: 'Metalpress',
    description: 'Build a static blog easily with Metalsmith.'
  },

  filedata: {
    site: 'data/_config.yaml'
  },

  firebase: {
    url: 'https://mysite.firebaseio.com'
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
    linksets: [
    {
      match: { collection: 'pages' },
      pattern: ':title'
    },
    {
       match: { collection: 'posts' },
       pattern: ':date/:title'
    }
    ]
  },

  pagination: {
     'collections.posts': {
       perPage: 5,
       first: 'blog/index.html',
       path: 'blog/:num/index.html',
       noPageOne: true,
       layout: 'blog.liquid'
     }
  },

  webpack: {
    dev: webpackConfig,
    prod: webpackProdConfig
  }

}
```

Next, create a directory structure including the following:

```sh
├── gulpfile.babel.js
├── metalpress.config.js
├── package.json
├── src
│   ├── data
│   ├── assets
│       ├── sass
│       ├── js
│           ├── index.js
│   ├── index.md
│   ├── pages
│   └── posts
├── templates
│   ├── _includes
│   └── _layouts
└── webpack.config.babel.js
└── webpack.config.prod.babel.js
```

To use metalpress, simply run it with the configuration in your gulpfile:

```js
import metalpress from 'metalpress';
import config from './metalpress.config.js';

gulp.task('metalpress', () => {
  const options = metalpress(config, (err, files) => {
    if (err) throw new Error(err);
    console.log('Metalpress site completed.');
  });
});
```

The project will be built to a `dist` directory.

Next, if you want ES6/Bower support 

- `$ npm install babel-loader bower-webpack-plugin --save-dev`
- add the following to your `webpack.config.babel.js`:

```js
import path from 'path';
import BowerWebpackPlugin from 'bower-webpack-plugin';

module.exports = {
  entry: path.resolve(__dirname, './src/assets/js/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules|src\/lib)/, 
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  externals: {
    'jquery': 'jQuery',
  },
  plugins: [
    new BowerWebpackPlugin({
      modulesDirectories: ['src/lib'],
      manifestFiles: 'bower.json'
    })
  ]
}
```

```js
import path from 'path';
import webpack from 'webpack';
import BowerWebpackPlugin from 'bower-webpack-plugin';

export default {
  entry: path.resolve(__dirname, './src/assets/js/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules|src\/lib)/,
        loader: 'babel'
      }
    ]
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new BowerWebpackPlugin({
      modulesDirectories: ['src/lib'],
      manifestFiles: 'bower.json'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
}
```

## Default Options

All options can be overridden with their respective plugin options.

```js
{
  title: 'MetalPress',
  description: 'Website to MetalPress',
  url: 'https://metalpress.io',
  sitemapPath: 'sitemap.xml',
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
  fingerprint: {
    pattern: 'assets/css/main.css'
  },
  markdown: {
    gfm: true,
    tables: true
  },
  permalinks: {
    relative: false,
    pattern: ':title'
  },
  layouts: {
    engine: 'liquid',
    directory: 'templates/_layouts',
    includeDir: 'templates/_includes'
  },
  inPlace: {
    engine: 'liquid',
    pattern: '**/*.liquid',
    includeDir: 'templates/_includes'
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
  }
}
```

## Production Builds

For production, simply overwrite the config with `production: true`.

```js
import metalpress from 'metalpress';
import config from './metalpress.config.js';

gulp.task('metalpress:prod', () => {
  const config = {...config, production: true};
  const options = metalpress(config, (err, files) => {
    if (err) throw new Error(err);
    console.log('Metalpress (production) site completed.');
  });
});

```
