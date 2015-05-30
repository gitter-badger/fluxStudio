var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, '..');

var nodeModulesPath = path.resolve(__dirname,'..', 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var publicPath = path.resolve(appPath, 'app','assets');
var assetsPath = path.resolve(publicPath,'client.js');


var config = {
  context: __dirname,
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 
    'webpack/hot/dev-server', 
     assetsPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query:{ optional:['es7'] },
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      loader: 'style!css!less'
    }]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
