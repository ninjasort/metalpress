import chalk from 'chalk';

// - filedata
// - collections
// - permalinks
// - pagination
// - rss
// - sitemap
// - custom webpack configs

const schema = {
  properties: {
    basePath: {
      description: chalk.blue('Path to your source code? (relative from root, default: .)'),
      type: 'string',
      required: false
    }
  }
};

export default schema;