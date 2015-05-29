var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var webpackConfig = require('./config/webpack.config.js');
var mainPath = path.resolve(__dirname, '.', 'client.js');


function bundleMaker() {

  var bundleStart = null;
  var compiler = webpack(webpackConfig);
  
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now();
  });

  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {
    publicPath: '/build/',
    inline: true,
    hot: true,
    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  bundler.listen(8080, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });

};

module.exports=bundleMaker;
