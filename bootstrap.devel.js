

module.exports= function(app){

  var httpProxy = require('http-proxy');
  var proxy = httpProxy.createProxyServer({
    changeOrigin: true
  }); 

  require('./bundler')();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
  });

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

  

}
