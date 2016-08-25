import commander from 'commander';
import Deploy from '../sub-commands/deploy';

const subCommand = new Deploy();

commander.on('--help', () => {
  subCommand.printUserHelp();
});

commander
  .option('-p, --production', 'Deploy to production')
  .parse(process.argv);

let args = commander;

if (args.production) {
  subCommand.run({ production: true });
} else {
  subCommand.run({ production: false });
}