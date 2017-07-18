var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
  return gulp.src('./public/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('vendor', function () {
  gulp.src(mainBowerFiles())
    // .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('js', function () {
  gulp.src('./public/js/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public'));
});

gulp.task('js:watch', function() {
  gulp.watch('./public/js/**/*.js', ['js']);
});

gulp.task('watch', ['js:watch', 'sass:watch']);
