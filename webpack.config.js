var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var opener = require('opener');

module.exports = {
    entry: {
        app: path.join(__dirname, './app/client')
    },

    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css-loader")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css-loader!less-loader")
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.HotModuleReplacementPlugin()/*,

        function () {
            opener('http://localhost:3000');
        }*/
    ],

    devtool: 'source-map'
};