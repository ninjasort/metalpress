import commander from 'commander';
import Serve from '../sub-commands/serve';

const subCommand = new Serve();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

subCommand.run();