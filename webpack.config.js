var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'project/static');
var APP_DIR = path.resolve(__dirname, 'project/components');

var config = {
  entry: APP_DIR + '/app.component.js',
  output: {
    path: BUILD_DIR,
    filename: 'masonry.js'
  },
  module : {
    loaders : [
      { test : /\.jsx?/, include : APP_DIR, loader : 'babel' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "file-loader" },
    ]
  }
};

module.exports = config;
