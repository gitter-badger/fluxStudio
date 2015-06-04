
module.exports = function(app){
  console.log('starting development proxy...'); 
  var httpProxy = require('http-proxy');
  var proxy = httpProxy.createProxyServer({
    changeOrigin: true
  }); 

  require('./webpack-dev-bundler')(app);
  app.all('/build/*', function (req, res) {
    console.log('redirecting...',req.url);
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });
  

}
