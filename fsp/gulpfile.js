var gulp = require('gulp');
var concat = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css')

var paths = {
  styles: {
    src: 'css/*.css',
    dest: 'fsp/css',
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'assets/scripts/'
  }
};

gulp.task('styles', function() {
  return gulp.src(paths.styles.src)
  .pipe(concat('concat.css'))
  .pipe(cleanCSS())
  // pass in options to the stream
  .pipe(gulp.dest(paths.styles.dest));
})