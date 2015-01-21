var gulp        = require('gulp');
var pkg         = require('./package.json');

var esformatter = require('gulp-esformatter');
var formatter   = require('./esformatter.json');
var uglify      = require('gulp-uglify');

var csscomb = require('gulp-csscomb');
var minify  = require('gulp-csso');
var rename  = require('gulp-rename');
var csscomb_options = require('./csscomb.json');

gulp.task('scripts', function() {
  gulp
  .src('./src/*.js')
  .pipe(rename(pkg.name + '-' + pkg.version + '.js'))
  .pipe(esformatter(formatter))
  .pipe(gulp.dest('./dist/'))
  .pipe(rename(pkg.name + '-' + pkg.version + '.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/'));
});

gulp.task('styles', function() {
  gulp
    .src('./src/*.css')
    .pipe(rename(pkg.name + '-' + pkg.version + '.css'))

    // Optimize css with [Comb]()
    .pipe(csscomb(csscomb_options))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename(pkg.name + '-' + pkg.version + '.min.css'))

    // Minify with [CSSO]()
    // Structural optimizations
    // @see http://bem.info/tools/optimizers/csso/description/ section1.2
    .pipe(minify(false))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['scripts', 'styles']);
