

var isProduction = process.env.NODE_ENV === 'production';
var express = require('express');
var path = require('path');
var app = express();
var port = 3000;
var publicPath = path.resolve(__dirname, 'public');



console.log('bootstrapping ',({0:'development',1:'production'})[isProduction?1:0],'server');
if (!isProduction) {
  module.change_code=1;
  var hs=require('hotswap');
  require('source-map-support').install();
  require('./bootstrap.devel.js')(app);  
}

if(isProduction) app.use(express.static(publicPath));

app.listen(port, function () {
  console.log('Server running on port ' + port);
});



function onSwap(){
  console.log('hotswapping'); 
};


hs.on('swap',onSwap);





require('./build')(function(){
  console.log('starting server');
  var appMain=require('./build/app');
  appMain(app,port);



},!isProduction,!isProduction);












