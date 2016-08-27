import path             from 'path';
import fs               from 'fs';
import Metalsmith       from 'metalsmith';
import deepAssign       from 'deep-assign';
import collections      from 'metalsmith-collections';
import metadata         from 'metalsmith-metadata';
import markdown         from 'metalsmith-markdown';
import layouts          from 'metalsmith-layouts';
import inPlace          from 'metalsmith-in-place';
import permalinks       from 'metalsmith-permalinks';
import pagination       from 'metalsmith-pagination';
import excerpts         from 'metalsmith-better-excerpts';
import sass             from 'metalsmith-sass';
import moment           from 'moment';
import define           from 'metalsmith-define';
import jekyllDates      from 'metalsmith-jekyll-dates';
import autoprefixer     from 'metalsmith-autoprefixer';
import webpack          from 'metalsmith-webpack';
import ignore           from 'metalsmith-ignore';
import metallic         from 'metalsmith-metallic';
import tags             from 'metalsmith-tags';
import snippet          from 'metalsmith-snippet';
import blc              from 'metalsmith-broken-link-checker';
import date             from 'metalsmith-build-date';
import robots           from 'metalsmith-robots';
import shortcodes       from 'metalsmith-flexible-shortcodes';
import diff             from 'metalsmith-differential';
import { loadJsOrYaml } from './util/fs';
// prod
import htmlMinifier     from 'metalsmith-html-minifier';
import fingerprint      from 'metalsmith-fingerprint';
import imagemin         from 'metalsmith-imagemin';
import sitemap          from 'metalsmith-sitemap';
import firebase         from 'metalsmith-firebase';
import rss              from 'metalsmith-rss';
import drafts           from 'metalsmith-drafts';

import createDefaults   from './config/defaults';

import gulp             from 'gulp';
import gulpsmith        from 'gulpsmith';
import gulp_front_matter from 'gulp-front-matter';

export default function (config = {}, callback) {
  
  let options = createDefaults(config);

  gulp.task('default', () => {
    return gulp.src('./src/**')
      .pipe(gulp_front_matter()).on("data", function(file) {
        Object.assign(file, file.frontMatter);
        delete file.frontMatter;
      })
      .pipe(
        gulpsmith()
          .metadata(options.metadata)
          .use(metadata(options.filedata))
          .use(date({ key: 'dateBuilt' }))
          .use(jekyllDates())
          .use(markdown(options.markdown))
          .use(excerpts(options.excerpts))
          .use(collections(options.collections))
          .use(permalinks(options.permalinks))
          .use(sass(options.sass))
          .use(fingerprint(options.fingerprint))
          .use(layouts(options.layouts))
          .use(inPlace(options.inPlace))
          .use(webpack(options.webpack.dev))
          .use(sitemap(options.sitemap))
      )
      .pipe(gulp.dest('./dist'))
      .on('end', () => {
        callback();
      });
  });

  gulp.start('default');

}