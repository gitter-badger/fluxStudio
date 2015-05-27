var gulp  = require('gulp'),
    babel = require('gulp-babel'),
    less  = require('gulp-less'),
    jsx   = require('gulp-react'),
    gcb   = require('gulp-callback'),
    jshint= require('gulp-jshint');




var build = function build(then,debug,watch){
  var t=null;
  gulp.task('serverBuild', function () {
    return gulp.src('app/**/*.js')
               .pipe(babel())
              // .pipe(jsx())
               .pipe(gulp.dest('build'))
               .pipe(gcb(function(){

                 console.log('rebuilding server app');
                 if(t){clearTimeout(t)}
                 t=setTimeout(then,300);

                }));
  });

  if(debug){
    gulp.task('lintServer',function(){
    return gulp.src('app/**/*.js')
               .pipe(babel()) //not efficient...
               .pipe(jshint({esnext:1,node:1}))
               .pipe(jshint.reporter('default'));
    });

    gulp.task('lintClient',function(){
      return gulp.src('public/build/**/*.js')
                 .pipe(babel())
                 .pipe(jshint({esnext:1}))
                 .pipe(jshint.reporter('default'));
    });
  }


  gulp.start();
  if(watch){
    gulp.watch('app/**/*.js',['serverBuild']);
  }
}


if (!module.parent) {
  build(function(){},1,0);
}

module.exports = build;
