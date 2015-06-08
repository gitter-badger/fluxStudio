var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var appPath = path.resolve(__dirname);

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var publicPath = path.resolve(appPath, 'app','assets');
var assetsPath = path.resolve(publicPath,'client.js');
var htmlPath   = '../../app/html/index.production.html';
console.log(htmlPath);

var config = {
  context: __dirname,
 // devtool: 'source-map',
  entry: {
    'client': assetsPath
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query:{ optional:['es7'] },
      exclude: [nodeModulesPath]
    },{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style','css!less')
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({template:'bundleTemplate.html',inject:true,filename:htmlPath}),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",{publicPath:'styles',allChunks:true})
  ]
};

module.exports = config;
