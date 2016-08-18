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
    },
    stagingBucket: {
      description: chalk.blue('Name of your S3 staging bucket?'),
      type: 'string',
      required: true
    },
    sitemap: {
      description: chalk.blue('Url to your sitemap?'),
      type: 'string',
      required: true,
      before: (value) => {
        return {
          hostname: value
        }
      }
    }
  }
};

export default schema;