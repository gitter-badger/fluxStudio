var gulp    = require('gulp'),
    babel   = require('gulp-babel'),
    less    = require('gulp-less'),
    jsx     = require('gulp-react'),
    jshint  = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    inject  = require('gulp-inject-string'),
    named   = require('vinyl-named');




var build = function build(then,debug,watch){

  gulp.task('serverBuild', function () {
    return gulp.src(['app/**/*.js','!app/assets/**/*.js'])
               .pipe(babel({stage:0}))
               .pipe(inject.prepend('module.change_code=1;\n'))
               .pipe(gulp.dest('build'));
  });

  if(!debug){
    gulp.task("clientBuild", function() {
        return gulp.src('app/assets/**/*.js')
            .pipe(named())
            .pipe(webpack(require('./config/webpack.production.config.js')))
            .pipe(gulp.dest('public/build'));
    });
  }

  gulp.task('runServer',['serverBuild'],then);


  if(debug){
/* 
  gulp.task('lintServer',function(){
    return gulp.src(['app//*.js','!app/assets//.js'])
               .pipe(babel({stage:0})) //not efficient...
               .pipe(jshint({esnext:1,node:1}))
               .pipe(jshint.reporter('default'));
    });

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
