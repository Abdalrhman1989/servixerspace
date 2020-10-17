const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

//compile scss into css
function style() {
  //1. where is my sass file going to be
  return gulp.src('./scss/**/*.scss')
  //2. pass that file through sass compiler
  .pipe(sass())
  //3.Where do I save the compiled css
  .pipe(gulp.dest('./css'))
}


exports.style = style;
