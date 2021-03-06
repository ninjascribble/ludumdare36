var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: path.join('scripts/game.js'),
    sourceMapFilename: '[file].map'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel?presets[]=es2015'
    }]
  },
  plugins: [
    new CleanPlugin(['build']),
    new CopyPlugin([{
      from: path.join('./static')
    }, {
      from: path.join('./assets'),
      to: 'assets'
    }, {
      from: path.join('../node_modules/phaser/build'),
      to: 'scripts'
    }])
  ]
};
