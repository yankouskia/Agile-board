var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: [
                path.join(__dirname, './app/client')
            ]
    },

    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].bundle.js'
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
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },

    resolve: {
        extensions: ['', '.js', '.json'],
        modulesDirectories: ['node_modules', 'app']
    },

    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.NoErrorsPlugin()
    ]

};