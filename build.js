var gulp  = require('gulp'),
    babel = require('gulp-babel'),
    less  = require('gulp-less'),
    jsx   = require('gulp-react'),
    gcb   = require('gulp-callback'),
    jshint= require('gulp-jshint');




module.exports = function(then,debug){
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
    if(debug){
      gulp.watch('app/**/*.js',['serverBuild']);
    }
  };

