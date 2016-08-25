import chalk from 'chalk';

// - filedata
// - collections
// - permalinks
// - pagination
// - rss
// - sitemap
// - custom webpack configs

// const schema = {
//   properties: {
//     basePath: {
//       description: chalk.blue('Path to your source code? (relative from root, default: .)'),
//       type: 'string',
//       required: false
//     },
//     stagingBucket: {
//       description: chalk.blue('Name of your S3 staging bucket?'),
//       type: 'string',
//       required: true
//     },
//     permalinks: {
//       description: chalk.blue(''),
//       type: 'array'
//     },
//     sitemap: {
//       description: chalk.blue('Url to your sitemap?'),
//       type: 'string',
//       required: true,
//       before: (value) => {
//         return {
//           hostname: value
//         }
//       }
//     }
//   }
// };
const schema = [
  {
    type: 'input',
    name: 'basePath',
    message: chalk.blue('Path to your source code? (relative from root, default: .)'),
    default: '.'
  },
  {
    type: 'input',
    name: 'awsKey',
    message: chalk.blue('Please type your AWS key.')
  },
  {
    type: 'input',
    name: 'awsSecret',
    message: chalk.blue('Please type your AWS secret.')
  },
  {
    type: 'input',
    name: 'stagingBucket',
    message: chalk.blue('Name of your S3 staging bucket?')
  },
  {
    type: 'input',
    name: 'productionBucket',
    message: chalk.blue('Name of your S3 production bucket?')
  },
  {
    type: 'input',
    name: 'sitemapHostname',
    message: chalk.blue('Sitemap hostname?'),
    default: 'http://example.com'
  },
  {
    type: 'confirm',
    name: 'customFileData',
    message: chalk.blue('Will you need custom filedata?')
  },
  {
    type: 'confirm',
    name: 'customCollections',
    message: chalk.blue('Will you need custom collections?')
  },
  {
    type: 'confirm',
    name: 'customPermalinks',
    message: chalk.blue('Will you need custom permalinks?')
  },
  {
    type: 'confirm',
    name: 'includePagination',
    message: chalk.blue('Will you need pagination?'),
    default: false
  },
  {
    type: 'confirm',
    name: 'includeRss',
    message: chalk.blue('Include RSS feed?'),
    default: true
  }
];

export default schema;