//
// Gulp.js
//

var Promise = require("es6-promise").Promise,
    gulp = require('gulp'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('scss', function() {
    return gulp.src('assets/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('main.min.css'))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('css', function() {
    return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
                     'assets/css/main.min.css'])
      .pipe(sourcemaps.init())
      .pipe(concat('site.min.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('assets/dist/css/'))
 });

gulp.task('js', function(){
  return gulp.src(['node_modules/jquery/dist/jquery.min.js',
                   'node_modules/bootstrap/dist/js/bootstrap.min.js',
                   'assets/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/dist/js/'));
});

gulp.task('default', ['scss', 'css', 'js']);

gulp.task('watch', function() {
  gulp.watch('assets/scss/*.scss', ['default']);
});
