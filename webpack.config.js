var path = require('path');
var webpack = require('webpack');
var opener = require('opener');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {
    entry: {
        app: path.join(__dirname, './app/client')
    },

    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].bundle.js'
    },

    module: {
        loaders: [
            { 
                test: path.join(__dirname, './app/client'),
                loader: 'babel-loader' 
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: path.join(__dirname, './app/client')
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
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

        function () {
            opener('http://localhost:3000');
        }
    ],

    devtool: 'source-map'
};