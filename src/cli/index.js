import commander from 'commander';

const program = commander;

program
  .command('init', 'initialize a metalpress.config.js file');

program
  .command('new', 'creates a new metalpress project');

program
  .command('serve', 'start a server on http://localhost:3000');

program
  .command('deploy', 'deploy a metalpress project');

program.parse(process.argv);