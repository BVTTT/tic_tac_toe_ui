const gulp = require('gulp');
const webpack = require('gulp-webpack');
const sass = require('gulp-sass');
const karma = require('karma');

const path = require('path');

const webpackConfig = require('./webpack.config.js');

gulp.task('compile:js', () => {
  gulp.src(webpackConfig.entry)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile:css', () => {
  gulp.src('app/index.scss')
    .pipe(sass({ includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets'] }).on('error', sass.logError))
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['compile:js', 'compile:css'], () => {
  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('test', (done) => {
  new karma.Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done).start();
});

gulp.task('watch', () => {
  gulp.watch(['app/**/*'], ['compile']);
  gulp.watch(['app/**/*.js', 'spec/**/*.js'], ['test']);
});
