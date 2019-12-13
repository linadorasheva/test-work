// 'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var server = require('browser-sync').create();

gulp.task('serve', function(done) {
  server.init({
    server: './source',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.scss', gulp.series('style'));
  gulp.watch('source/*.html').on('change', () => {
    server.reload();
    done();
  });

  done();
});

gulp.task('style', function(done) {
  return gulp.src('source/sass/style.scss')
    // .pipe(plumber())
    .pipe(sass())

    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());

  done();
});


gulp.task('default', gulp.series('style','serve'));
