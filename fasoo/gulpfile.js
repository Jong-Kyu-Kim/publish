var gulp = require('gulp'),
    debug = require('gulp-debug'),
    fileinclude = require('gulp-file-include'),
    htmlbeautify = require('gulp-html-beautify'),

    src = './src/html/**/*.html',
    dist = './dist/html/**/*.html';
 
gulp.task('fileinclude', function() {
  gulp.src([src, '!./src/html/_include/*'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      indent: false
    }))
    .pipe(debug())
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('htmlbeautify', function() {
  gulp.src(dist)
    .pipe(htmlbeautify({
      indent_size: 4,
      preserve_newlines: false
    }))
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('watch', function() {
    gulp.watch(src, ['fileinclude']);
});

gulp.task('default', ['watch']);