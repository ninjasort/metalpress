import commander from 'commander';

const program = commander;

program
  .command('init', 'initialize a metalpress project.')

program.parse(process.argv);