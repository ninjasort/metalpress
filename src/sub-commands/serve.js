import path from 'path';
import fs from 'fs';
import SubCommand from '../models/sub-command';
import gulp from 'gulp';
import s3 from 'gulp-s3';
import browserSync from 'browser-sync';
import metalpress from '../';
// import defaultConfig from '../../templates/metalpress.config';

var paths = {
  src: 'src/**',
  templates: [
    'templates/_layouts/*.liquid', 
    'templates/_includes/**/*.liquid'
  ]
};

export default class Serve extends SubCommand {
  constructor() {
    super();
    this.serverStarted = false;
    this.baseDir = './dist';
    this.config = this.settings.settings;

    this.defineTasks();
  }

  printUserHelp() {
    this.ui.write('Serves a metalpress project on a browser-sync server (default: http://localhost:3000)\n');
  }

  defineTasks() {
    gulp.task('dev-build', cb => {
      metalpress(this.config, this.refresh(cb));
    });

    // gulp.task('dist-watch', cb => {
    //   const prodConfig = Object.assign({}, config, {metadata: {production: true}});
    //   metalpress(prodConfig, refresh(cb));
    // });

    gulp.task('watch', ['dev-build'], cb => {
      gulp.watch(paths.src, ['dev-build'])
      gulp.watch(paths.templates, ['dev-build'])
    });
  }

  refresh(cb) {
    return (...args) => {
      if (!this.serverStarted) {
        browserSync({
          ghostMode: {
            clicks: true,
            scroll: true,
            links: true,
            forms: true
          },
          server: {
            baseDir: this.baseDir
          }
        })
        this.serverStarted = true;
      } else {
        browserSync.reload();
      }
      cb(...args)
    }
  }

  start() {
    gulp.start('watch');
  }

  run() {
    this.start();
  }
}