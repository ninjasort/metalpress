import chalk from 'chalk';
import inquirer from 'inquirer';

export const collections = [
  {
    type: 'input',
    name: 'collectionName',
    message: 'Type the name of your collection.'
  },
  {
    type: 'input',
    name: 'collectionPattern',
    message: 'Type the pattern for your collection. Where are the HTML files? (Ex. pages/*.html)'
  },
  {
    type: 'confirm',
    name: 'collectionIsSorted',
    message: 'Is this collection be sorted?',
    default: false
  },
  {
    type: 'input',
    name: 'collectionSortKey',
    message: 'Type the key that is sorted from this collection. (default: date)',
    default: 'date',
    when: (answers) => {
      return answers.collectionIsSorted
    }
  },
  {
    type: 'input',
    name: 'collectionReverseSort',
    message: 'Reverse the sort order?',
    default: true,
    when: (answers) => {
      return answers.collectionIsSorted
    }
  },
  {
    type: 'confirm',
    name: 'another',
    message: 'Add another collection?',
    default: true
  }
];

export function askCollections(questions, branch) {
  return inquirer.prompt(questions)
    .then(result => {
      var model = {
        pattern: result.collectionPattern
      }
      if (result.collectionIsSorted) {
        model.sortBy = result.collectionSortKey;
        model.reverse = result.collectionReverseSort;
      }
      
      branch[result.collectionName] = model;
      
      if (result.another) {
        return askCollections(questions, branch);
      } else {
        return branch;
      }
    });
}

export const permalinks = [
  {
    type: 'input',
    name: 'permalinkCollection',
    message: 'Type the collection of your permalink.',
  },
  {
    type: 'input',
    name: 'permalinkPattern',
    message: 'Type the pattern of your permalink. (Ex. collection/:title)'
  },
  {
    type: 'confirm',
    name: 'another',
    message: 'Add another permalink?',
    default: true
  }
];

export function askPermalinks(questions, branch) {
  return inquirer.prompt(questions)
    .then(result => {
      branch.push({
        match: { collection: result.permalinkCollection },
        pattern: result.permalinkPattern
      });
      if (result.another) {
        return askPermalinks(questions, branch);
      } else {
        return branch;
      }
    });
}

export const filedata = [
  {
    type: 'input',
    name: 'fileDataName',
    message: 'Type the key of your filedata.'
  },
  {
    type: 'input',
    name: 'fileDataFile',
    message: 'Type the path to your filedata.'
  },
  {
    type: 'confirm',
    name: 'another',
    message: 'Add another filedata object?',
    default: true
  }
];

export function askFileData(questions, branch) {
  return inquirer.prompt(questions)
    .then(result => {
      
      branch[result.fileDataName] = result.fileDataFile;

      if (result.another) {
        return askFileData(questions, branch);
      } else {
        return branch;
      }
    });
}

export const pagination = [
  {
    type: 'input',
    name: 'paginationCollection',
    message: 'Type the collection you would like to paginate.',
    filter: (value) => {
      return `collections.${value}`;
    }
  },
  {
    type: 'input',
    name: 'paginationPerPage',
    message: 'How many items per page?',
    default: 5
  },
  {
    type: 'input',
    name: 'paginationPath',
    message: 'Type the path to each index page. Use num for indexes.',
    default: 'blog/:num/index.html'
  },
  {
    type: 'input',
    name: 'paginationFirst',
    message: 'Type the path to the blog index.',
    default: 'blog/index.html'
  },
  {
    type: 'input',
    name: 'paginationLayout',
    message: 'Type the layout for your pagination page.',
    default: 'blog.liquid'
  },
  {
    type: 'input',
    name: 'paginationMetadata',
    message: 'Type the path to your blog filedata.',
    default: 'data/blog.yaml'
  },
  {
    type: 'confirm',
    name: 'another',
    message: 'Add another paginated collection?',
    default: true
  }
];

export function askPagination(questions, branch) {
  return inquirer.prompt(questions)
    .then(result => {
      
      branch[result.paginationCollection] = {
        perPage: result.paginationPerPage,
        first: result.paginationFirst,
        path: result.paginationPath,
        pageMetadata: result.paginationMetadata,
        layout: result.paginationLayout
      };

      if (result.another) {
        return askFileData(questions, branch);
      } else {
        return branch;
      }
    });
}

export const rss = [
  {
    type: 'input',
    name: 'rssKey',
    message: 'Type a rss feedOption key.'
  },
  {
    type: 'input',
    name: 'rssValue',
    message: 'Type a rss feedOption value.'
  },
  {
    type: 'confirm',
    name: 'another',
    message: 'Add another rss feedOption?',
    default: true
  }
];

export function askRss(questions, branch) {
  return inquirer.prompt(questions)
    .then(result => {
      
      branch.feedOptions[result.rssKey] = result.rssValue;

      if (result.another) {
        return askRss(questions, branch);
      } else {
        return branch;
      }
    });
}