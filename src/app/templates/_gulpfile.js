var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

// Build the client app.
gulp.task('js', function () {

  return browserify({
    entries: [
      './src/client/app.jsx',
    ],
    extensions: [
      '.jsx',
      '.js',
    ],
  })
  .transform(babelify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('dist/js/'));
});

// Build the stylesheet.
gulp.task('css', function () {

  return gulp.src('./src/client/styles/app.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(rename('app.css'))
  .pipe(gulp.dest('dist/css/'));
});

// Minify application JavaScript.
gulp.task('minifyjs', [ 'js' ], function () {

  return gulp.src('./dist/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'));
});

// Minify application CSS.
gulp.task('minifycss', [ 'css' ], function () {

  return gulp.src('./dist/css/app.css')
  .pipe(cssnano())
  .pipe(gulp.dest('./dist/css'));
});

// Register watchers.
gulp.task('watch', function () {

  gulp.watch([
    'src/client/**/*.jsx',
    'src/client/**/*.js',
    'src/universal/**/*',
  ], [
    'js',
  ]);

  gulp.watch([
    'src/client/**/*.scss',
  ], [
    'css',
  ]);
});

// Task runners.
gulp.task('default', [
  'js',
  'css',
]);

gulp.task('production', [
  'default',
  'minifyjs',
  'minifycss',
]);
