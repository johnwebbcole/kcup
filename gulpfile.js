/* globals require */
var gulp = require('gulp');
var del = require('del');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('clean', function (done) {
  del(['dist/*']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n')); // eslint-disable-line no-console, no-undef
    done();
  });
});

gulp.task('inject', function () {
  return gulp.src('kcup.jscad')
    .pipe(plugins.plumber())
    .pipe(plugins.inject(
      plugins.merge(
        gulp.src('package.json').pipe(plugins.jscadFiles()),
        gulp.src(['!kcup.jscad', '*.jscad'])), {
        relative: true,
        starttag: '// include:js',
        endtag: '// endinject',
        transform: function (filepath, file) {
          return '// ' + filepath + '\n' + file.contents.toString('utf8');
        }
      }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'inject'], function () {
  plugins.watch(['!**/*.*~', '!dist/*', '**/*.jscad', 'node_modules/'], {
    verbose: true,
    followSymlinks: true,
    readDelay: 500
  }, function () {
    gulp.start('inject');
  });
});
