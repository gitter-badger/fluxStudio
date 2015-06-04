var gulp    = require('gulp'),
    changed = require('gulp-changed')
    babel   = require('gulp-babel'),
    less    = require('gulp-less'),
   // jsx     = require('gulp-react'),
    jshint  = require('gulp-jshint'),
    webpack = require('gulp-webpack'),
    inject  = require('gulp-inject-string'),
    named   = require('vinyl-named'),
    sourcemaps = require('gulp-sourcemaps');
 

gulp.task('server', function () {
  var dest = 'build/app';
  return gulp.src(['app/**/*.js','!app/assets/**/*.js'])
             .pipe(changed(dest))
             .pipe(sourcemaps.init())
               .pipe(babel({stage:0}))
               .pipe(inject.prepend('module.change_code=1;\n'))
             .pipe(sourcemaps.write('./maps'))
             .pipe(gulp.dest(dest));
});

gulp.task("client", function() {

  var webpackConfig   = require('./webpack.production.js');
  delete webpackConfig.entry;
  delete webpackConfig.output;
  var webpackCompiler = webpack(webpackConfig);

  var dest = 'public/build';
  return gulp.src('app/assets/**/*.js')
             .pipe(changed(dest))
             .pipe(named())
             .pipe(webpackCompiler)
             .pipe(gulp.dest(dest));
});


gulp.task('lib', function () {
  var dest = 'build/lib';
  return gulp.src(['lib/**/*.js'])
             .pipe(changed(dest))
             .pipe(sourcemaps.init())
               .pipe(babel({stage:0}))
             .pipe(sourcemaps.write('./maps'))
             .pipe(gulp.dest(dest));
});



gulp.task('dev',['server']);

gulp.task('default',['server','client']);

module.exports = gulp;
