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
            {test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            // {   test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, 
            //     loader: ExtractTextPlugin.extract("style", "url-loader?limit=10000&minetype=application/font-woff") 
            // },
            // { 
            //     test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
            //     loader: ExtractTextPlugin.extract("style", "file-loader")
            // },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/, 
                loader: 'raw'
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