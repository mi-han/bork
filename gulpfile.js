const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const htmlmin = require('gulp-htmlmin');
const jsmin = require('gulp-jsmin');
const tinypng = require('gulp-tinypng-compress');
const cwebp = require('gulp-cwebp');
const browserSync = require('browser-sync').create();
const del = require('del');
const rename = require('gulp-rename');

// live server (browser-reload)
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    open: false,
    cors: true
  });
  gulp.watch("./source/sass/*.scss", gulp.series('sass'));
  gulp.watch("./source/*.html", gulp.series('html'));
  gulp.watch('./source/fonts/*.{woff, woff2}', gulp.series('fonts'));
  gulp.watch('./source/scripts/*.js', gulp.series('scripts'));
  gulp.watch('./source/images/*.{png,jpg,jpeg}', gulp.series('tinypng', 'webp'));
});

// SASS -> CSS
gulp.task('sass', function() {
  return gulp.src("./source/sass/main.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});

// HTML
gulp.task('html', function() {
  return gulp.src("./source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("./build"))
    .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', function() {
  del.sync("./build/fonts");
  return gulp.src("./source/fonts/*")
    .pipe(gulp.dest("./build/fonts"));
});

// Scripts
gulp.task('scripts', function() {
  del.sync("./build/scripts");
  return gulp.src("./source/scripts/main.js")
    .pipe(jsmin())
    .pipe(gulp.dest("./build/scripts"))
    .pipe(browserSync.stream());
});

// TINYPNG
gulp.task('tinypng', function () {
  del.sync('./build/images/*.{png,jpg,jpeg}');
  return gulp.src('./source/images/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: 'wNS29BVwd8BM7rkKHQxBKtnLgZHxbM81',
      log: false
    }))
    .pipe(gulp.dest('./build/images'))
    .pipe(browserSync.stream());
});

// WEBP
gulp.task('webp', function() {
  del.sync('./build/images/*.webp');
  return gulp.src('./source/images/*.{png,jpg,jpeg}')
    .pipe(cwebp())
    .pipe(gulp.dest('./build/images'))
    .pipe(browserSync.stream());
});

gulp.task('images', gulp.series('tinypng', 'webp'));
gulp.task('default', gulp.parallel('sass', 'html', 'fonts', 'scripts', 'images', 'browser-sync'));
