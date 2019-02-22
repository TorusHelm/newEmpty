'use strict';

const gulp = require('gulp'),
      prefixer = require('gulp-autoprefixer'),
      uglify = require('gulp-uglify'),
      rollup = require('gulp-better-rollup'),
      babel = require('gulp-babel'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      newer = require('gulp-newer'),
      size = require('gulp-size'),
      sourcemaps = require('gulp-sourcemaps'),
      browsersync = require("browser-sync").create(),
      pug = require('gulp-pug');

const path = {
  build: {
    css: 'public/css/',
    img: 'public/img/',
    js: 'public/js/',
    base: '',
    html: 'public/',
    fonts: 'public/fonts/'
  },
  src: {
    style: '_dev/scss/*.scss',
    scss: '_dev/scss/',
    img: '_dev/img/**/*',
    js: '_dev/js/*.js',
    pug: '_dev/tmpl/*.pug',
    fonts: '_dev/fonts/'
  },
  watch: {
    style: '_dev/scss/**/*.scss',
    img: '_dev/img/**/*',
    js: '_dev/js/**/*.js',
    html: '_dev/*.html',
    pug: '_dev/tmpl/**/*.pug',
    fonts: '_dev/fonts/'
  },
  clean: 'public/'
};

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "public/"
    },
    port: 9000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function styles() {
  return gulp
    .src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', console.log)
    .pipe(prefixer('last 3 versions'))
    .pipe(csso())
    .pipe(sourcemaps.write('./maps'))
    .pipe(size())
    .pipe(gulp.dest(path.build.css))
    .pipe(browsersync.stream());
}

function images() {
  return gulp
    .src(path.src.img)
    .pipe(newer(path.build.img))
    .on('error', console.log)
    .pipe(gulp.dest(path.build.img));
}

function js() {
  return gulp
    .src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(rollup({format: 'cjs'}))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(path.build.js))
    .pipe(browsersync.stream());
}

//minify js
function releaseJS(){
  return gulp
    .src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
}

// pug error
function swallowError(error) {
  console.log(error.toString());
  this.emit('end')
}

function html() {
  return gulp
    .src(path.src.pug)
    .pipe(pug({
      pretty: true
    }))
    .on('error', swallowError)
    .pipe(gulp.dest(path.build.html));
}

function fonts() {
  return gulp
    .src(path.src.fonts)
    .on('error', console.log)
    .pipe(gulp.dest(path.build.fonts));
}

function watchFiles(){
  gulp.watch([path.watch.img], images);
  gulp.watch([path.watch.fonts], fonts);
  gulp.watch([path.watch.style], styles);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.pug], gulp.series(html, browserSyncReload));
}

// Tasks
gulp.task("images", images);
gulp.task("css", styles);
gulp.task("js", js);
gulp.task("html", html);
gulp.task("releaseJS", releaseJS);
gulp.task("fonts", fonts);

gulp.task('build', gulp.parallel(styles, images, js, html, fonts));

// watch
gulp.task("default", gulp.parallel(watchFiles, browserSync));