# metalpress [![npm](https://img.shields.io/npm/v/metalpress.svg?maxAge=2592000?style=flat-square)](https://www.npmjs.com/package/metalpress) [![Travis](https://img.shields.io/travis/axisdefined/metalpress.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/axisdefined/metalpress) [![Codecov](https://img.shields.io/codecov/c/github/axisdefined/metalpress.svg?maxAge=2592000?style=flat-square)](https://codecov.io/gh/axisdefined/metalpress) 

> Create a blog easily with Metalsmith.

An opinionated boilerplate for quickly creating a blog with [Metalsmith](https://github.com/metalsmith/metalsmith).

## Features

- Scaffolding CLI
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

To get started with metalpress, simply use the CLI to create a new project or initialize and existing directory.

### Initialize
```js
metalpress init
```
Prompts a series of questions and creates a new `.metalpress` config.

Metalpress works from a specific directory structure. It contains a `templates` and `src` directory.

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

To use metalpress, simply run `metalpress serve`

The project will be built to a `dist` directory.

You can use NPM/Bower packages within your js as well.

## Deployment

To deploy your site, you'll need to have your `aws.json` set up. It includes:

```
{
  "key":"AWS_ACCESS_KEY_HERE",
  "secret":"AWS_SECRET_KEY_HERE",
  "stagingBucket":"staging.example.com",
  "productionBucket":"example.com"
}
```

Finally, you can run the deploy command.

*Staging*
```
metalpress deploy
```

*Production*
```
metalpress deploy -p
```