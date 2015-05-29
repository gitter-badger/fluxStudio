var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname,  'app','assets','client.js');

var config = {

 // devtool: 'source-map',
 // entry: mainPath,
 /* output: {
    path: buildPath,
    filename: 'bundle.js'
  },*/
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query:{ optional:['es7'] },
      exclude: [nodeModulesPath]
    },{
      test: /\.css$/,
      loader: 'style!css!less'
    }]
  }
};

module.exports = config;
