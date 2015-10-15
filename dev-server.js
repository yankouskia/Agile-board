'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var compiler = webpack(require('./webpack.config.js'));

var server = {
    port: 3003,
    host: '0.0.0.0',
    options: {
        publicPath: 'http://localhost:3003/assets/',
        hot: true,
        stats: {
            assets: true,
            colors: true,
            version: false,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false
        }
    }
};

var devServer = new WebpackDevServer(compiler, server.options);

devServer.listen(server.port, server.host, function () {
    console.log('listen webpack dev server', server.port);
});
