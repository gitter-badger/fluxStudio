var gulp  = require('gulp'),
    babel = require('gulp-babel'),
    less  = require('gulp-less'),
    jsx   = require('gulp-react'),
    gcb   = require('gulp-callback'),
    jshint= require('gulp-jshint');




module.exports = function(then,watch){
  var t=null;
  gulp.task('serverBuild', function () {
    return gulp.src('app/**/*.js')
               .pipe(babel())
               .pipe(jsx())
               .pipe(gulp.dest('build'))
               .pipe(gcb(function(){

                  console.log('rebuilding server app');
                  if(t){clearTimeout(t)}
                  t=setTimeout(then,300);
              
               }));
  });

  gulp.task('lint',function(){
    return gulp.src('build/**/*.js')
      .pipe(jshint({esnext:1,node:1}))
      .pipe(jshint.reporter('default'));
  });

  gulp.start();
  if(watch){
    gulp.watch('app/**/*.js',['serverBuild']);
  }

};

