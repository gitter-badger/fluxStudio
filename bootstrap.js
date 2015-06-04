var path = require('path');
var gulp = global.gulp = require('gulp');
var task = require('./gulpfile');

var express = require('express');
var app = express();

var port = 3000;
var publicPath = path.resolve(__dirname, 'public');
var isProduction = process.env.NODE_ENV === 'production';


require('source-map-support').install();

console.log('bootstrapping ',({0:'development',1:'production'})[isProduction?1:0],'server');
if (!isProduction) {
 
  module.change_code=1;
  var hs=require('hotswap');
  console.log('starting dev');
  require('./webpack-dev-proxy')(app);  
 
  function onSwap(file){
    console.log('hotswapping',file); 
  };

  hs.on('swap',onSwap); 
}

app.use( express.static(publicPath) );

app.listen(port, function () {
  console.log('Server running on port ' + port);
});


gulp.start(['dev'],function(){
  require('./build/app/app')(app);

  if(!isProduction){
    gulp.watch('./app/**/*.js',['dev']);
  }

});












