# metalpress [![npm](https://img.shields.io/npm/v/metalpress.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/metalpress) [![Travis](https://img.shields.io/travis/axisdefined/metalpress.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/axisdefined/metalpress) [![Codecov](https://img.shields.io/codecov/c/github/axisdefined/metalpress.svg?maxAge=2592000?style=flat-square)](https://codecov.io/gh/axisdefined/metalpress) 

> Create a blog easily with Metalsmith.

A wrapper of Metalsmith plugins for quickly creating a blog with [Metalsmith](https://github.com/metalsmith/metalsmith).

## Features

- Liquid Templating
- Markdown Rendering
- Permalinks
- Pagination
- Firebase Data Integration
- Webpack Bundling
- Use NPM Modules
- SASS Compiling and CSS Fingerprinting
- RSS & Sitemap Support
- Imagemin, Code Highlighting, Html Minification
- robots.txt
- Post Features
  - Excerpts
  - Tags
  - Drafts

## Installation

```sh
$ npm install metalpress --save
```

## Structure and Templating

metalpress works from a specific directory structure. It contains a `templates` and `src` directory. Within the src directory it will load data from `data` as `yaml` or `json` files. You can create folders for collections and use markdown files for pages. You should store all assets in `assets`.

For templating, metalpress uses liquid. You can learn more about the [syntax here](https://github.com/leizongmin/tinyliquid).

Here's an example structure:

```sh
├── package.json
├── src
│   ├── data
│       ├── site.yaml
│       ├── projects.json
│   ├── assets
│       ├── sass
│       ├── img
│       ├── fonts
│       ├── js
│           ├── index.js
│   ├── index.md
│   ├── pages
│       ├── about.md
│   └── posts
│       ├── 2016-08-25-how-to-use-metalpress.md
├── templates
│   ├── _includes
│       ├── header.liquid
│       ├── footer.liquid
│   └── _layouts
│       ├── home.liquid
```


## Usage

To get started with metalpress, you can use the API or [CLI](https://github.com/axisdefined/metalpress-cli).

### API Usage

metalpress taks a [config](https://github.com/axisdefined/metalpress/wiki/Default-Config) object and callback. It will process the files in the config, build the site, and return a metalsmith instance. The callback will contain any errors and the file mappings.

```js
import metalpress from 'metalpress';
import config from './metalpress.config';

const m = metalpress(config, (err, files) => {
  console.log('New site build completed.');
});

```

### CLI Usage

#### Install CLI

```sh
npm install metalpress-cli -g
```

#### Initialize a New Project

> Prompts a series of questions and creates a new `.metalpress` config.

```sh
metalpress init
```

#### Start a Browser-sync Server

> Serve the project on automatically assigned browser-sync port. (default: http://localhost:3000)

```sh
metalpress serve
```

#### Deploy a Project

To deploy your site, you'll need to have your `aws.json` set up. It includes:

```
{
  "key":"AWS_ACCESS_KEY_HERE",
  "secret":"AWS_SECRET_KEY_HERE",
  "stagingBucket":"staging.example.com",
  "productionBucket":"example.com"
}
```

> Deploy a `dist` and deployed to AWS S3.

*Staging*
```sh
metalpress deploy
```

*Production*
```sh
metalpress deploy -p
```

### Webpack Usage

By default, metalpress uses a webpack configuration for both staging and production environments. Within your config, you can specify `jquery: true` for included support jquery.

If you need to do so, you can override webpack with a custom config. For example, you can use the following options in your .metalpress config. You can add only the parameters you need which will be extended into the defaults, or override the entire file as needed.

```json
{
  "webpack": {
    "dev": "./webpack.config.js",
    "prod": "./webpack.prod.config.js"
  }
}
```

For Questions, Issues, PRs please refer to [@cameronroe](http://github.com/cameronroe)

[GPL-3 LICENSE](/LICENSE)