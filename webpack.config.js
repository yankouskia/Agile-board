var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

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
                loader: ExtractTextPlugin.extract("style", "css-loader!postcss")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css-loader!less-loader!postcss")
            },
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
            },
            {
                test: /\.(woff(\?.*)?|woff2(\?.*)?|svg(\?.*)?|ttf(\?.*)?|eot(\?.*)?)$/,
                loader: 'url?name=fonts/[name].[ext]'
            }
        ]
    },

    postcss: [
        autoprefixer({ browsers: ['last 2 version'] }),
    ],

    plugins: [
        new ExtractTextPlugin('[name].bundle.css', {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],

    resolve: require('./resolve.js')
};