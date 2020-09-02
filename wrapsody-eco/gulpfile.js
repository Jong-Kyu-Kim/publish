var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

sass.compiler = require('node-sass');

// var less = require('gulp-less');
// var babel = require('gulp-babel');
// var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var cleanCSS = require('gulp-clean-css');
//var del = require('del');
 
var paths = {
  styles: {
    src: 'src/scss/*.scss',
    dest: 'assets/resources/css/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'assets/resources/js/'
  },
  include: {
    src: 'src/html/**/*.html',
    dest: 'assets/'
  }
};
 
/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'assets' ]);
}
 
/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
       outputStyle: 'compressed'
       //outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}
 
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    //.pipe(babel())
    .pipe(uglify())
    //.pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

function include() {
  return gulp.src(paths.include.src)
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file',
    indent: false
  }))
  .pipe(gulp.dest(paths.include.dest));
}
 
function watch() {
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.include.src, include);
}
 
/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts));
 
/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = watch;