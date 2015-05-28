
var isProduction = process.env.NODE_ENV === 'production';
var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({
  changeOrigin: true
}); 

var app = express();
var port = isProduction ? 8080 : 3000;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));


console.log('prod',isProduction);
if (!isProduction) {

  require('./bundler')();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});


require('./build')(function(){
  var appMain=require('./build/app');
  appMain(app,port);
},!isProduction,!isProduction);




