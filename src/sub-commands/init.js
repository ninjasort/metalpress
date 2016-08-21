import prompt from 'prompt';
import inquirer from 'inquirer';
import figlet from 'figlet';

import SubCommand from '../models/sub-command';

import initPrompt from '../prompts/initPrompt';
import {
  permalinks,
  askPermalinks,
  collections,
  askCollections,
  filedata,
  askFileData,
  pagination,
  askPagination,
  rss,
  askRss
} from '../prompts';
import { setupPrompt } from '../prompts/setup';
import { success } from '../util/text-helper';

export default class Init extends SubCommand {
  constructor() {
    super();
    setupPrompt('initialization', prompt);
  }

  printUserHelp() {
    this.ui.write(
      'Initializes a .metalpress config with project settings.'
    );
  }

  run() {
    this.ui.write(this.cliLogo() + '\n\n');
    var aws = {};
    // outline a base config
    var config = {
      filedata: {},
      collections: {},
      permalinks: {
        relative: false,
        linksets: []
      },
      pagination: {},
      sitemap: {
        hostname: ''
      }
    };
    var flags = {};
    // ask the initial questions
    inquirer.prompt(initPrompt)
      .then((results) => {
        // set up flags because of awkward promise chain
        flags.customCollections = results.customCollections;
        flags.customPermalinks = results.customPermalinks;
        flags.customFileData = results.customFileData;
        flags.includePagination = results.includePagination;
        flags.includeRss = results.includeRss;
        // set up other config objects
        config.sitemap.hostname = results.sitemapHostname;
        config.basePath = results.basePath;
        aws['key'] = results.awsKey;
        aws['secret'] = results.awsSecret;
        aws['stagingBucket'] = results.stagingBucket;
        aws['productionBucket'] = results.productionBucket;
        
        if (flags.customFileData) {
          let treeBranch = config.filedata;
          return askFileData(filedata, treeBranch);
        }
      })
      .then((results) => {
        // ask custom collections
        if (flags.customCollections) {
          let treeBranch = config.collections;
          return askCollections(collections, treeBranch);
        }
      })
      .then((results) => {
        // ask custom permalinks
        if (flags.customPermalinks) {
          let treeBranch = config.permalinks.linksets;
          return askPermalinks(permalinks, treeBranch);
        }
      })
      .then((results) => {
        // ask pagination
        if (flags.includePagination) {
          let treeBranch = config.pagination;
          return askPagination(pagination, treeBranch);
        } else {
          config.pagination = false;
        }
      })
      .then((results) => {
        // ask rss
        if (flags.includeRss) {
          let treeBranch = config.rss = {
            feedOptions: {}
          };
          return askRss(rss, treeBranch); 
        }
      })
      .then((results) => {
        this.ui.writeInfo('Saving your settings...');
        this.settings.writeSecureJson('aws.json', aws);
        this.settings.setAllSettings(config);
        this.settings.save();
        this.ui.writeCreate('.metalpress with configuration saved in project root.');
      })
  }

  cliLogo() {
    return success(
      figlet.textSync('metalpress', {
        font: 'Doom',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    );
  }
}