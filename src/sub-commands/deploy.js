import path from 'path';
import fs from 'fs';
import SubCommand from '../models/sub-command';
import gulp from 'gulp';
import s3 from 'gulp-s3';
import metalpress from '../';

const awsOptions = {
  headers: {
    'Cache-Control': 'max-age=7200, must-revalidate'
  }
};

export default class Deploy extends SubCommand {
  constructor() {
    super();
    this.serverStarted = false;
    this.baseDir = './dist';
    this.config = this.settings.settings;
    
    try {
      this.aws = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './aws.json')));
    } catch (e) {
      this.ui.writeError('Please configure a aws.json file');
    }
  
    this.awsStaging = Object.assign({}, this.aws, {bucket: this.aws.stagingBucket });
    this.awsProd = Object.assign({}, this.aws, {bucket: this.aws.productionBucket });
    
    this.defineTasks();
  }

  printUserHelp() {
    this.ui.write('Deploys a metalpress project to an AWS bucket (staging/production)\n');
  }

  defineTasks() {
    gulp.task('dist', cb => {
      const prodConfig = Object.assign({}, this.config, {metadata: {production: true}});
      metalpress(prodConfig, cb);
    });

    gulp.task('deploy', ['dist'], cb => {
      return gulp.src('dist/**')
        .pipe(s3(this.awsStaging, awsOptions));
    });
    
    gulp.task('deploy:production', ['dist'], cb => {
      return gulp.src('dist/**')
        .pipe(s3(this.awsProd, awsOptions));
    });
  }

  deploy(options) {
    if (options.production) {
      gulp.start('deploy:production');
    } else {
      gulp.start('deploy')
    }
  }

  run(options) {
    this.deploy(options);
  }
}