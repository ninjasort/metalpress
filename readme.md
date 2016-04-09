# metalpress

> Create a blog easily with Metalsmith.

**UNDER DEVELOPMENT - (ALPHA)**

An opinionated boilerplate for quickly creating a blog with [Metalsmith](https://github.com/metalsmith/metalsmith).

## Features

- Liquid Templating
- Markdown Support
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

export default {

  basePath: path.resolve(__dirname, '.'),

  metadata: {
    site: '_data/_config.yaml'
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
    dev: webpackConfig
  }

}
```

Next, create a directory structure including the following:

```sh
├── gulpfile.babel.js
├── metalpress.config.js
├── package.json
├── src
│   ├── _data
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
```

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