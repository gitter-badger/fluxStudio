var gulp  = require('gulp'),
    babel = require('gulp-babel'),
    less  = require('gulp-less'),
    jsx   = require('gulp-react'),
    gcb   = require('gulp-callback'),
    jshint= require('gulp-jshint');




var build = function build(then,debug,watch){
  var t=null;
  gulp.task('serverBuild', function () {
    return gulp.src(['app/**/*.js','!app/assets/**/*.js'])
               .pipe(babel({stage:0}))
               .pipe(gulp.dest('build'));
  });


  gulp.task('runServer',['serverBuild'],then);


  if(debug){
    gulp.task('lintServer',function(){
    return gulp.src(['app/**/*.js','!app/assets/**/*.js'])
               .pipe(babel({stage:0})) //not efficient...
               .pipe(jshint({esnext:1,node:1}))
               .pipe(jshint.reporter('default'));
    });
/*
    gulp.task('lintClient',function(){
      return gulp.src(['app/assets/***./*.js'])
                 .pipe(babel({stage:0}))
                 .pipe(jshint({esnext:1,browser:1,devel:1}))
                 .pipe(jshint.reporter('default'));
    });*/
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
