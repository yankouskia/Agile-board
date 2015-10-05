var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var opener = require('opener');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(ROOT_PATH, 'app/client'),

  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { 
      	test: path.join(__dirname, 'app/client'),
        loader: 'babel-loader' 
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.resolve(ROOT_PATH, 'app/client')
      }
    ]
  },

  devServer: {
  	port: 3000,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlwebpackPlugin({
      title: 'Agile board'
    }),

    function () {
        opener('http://localhost:3000');
    }
  ],

  devtool: 'source-map'
};