'use strict';

import http from 'http';
import koa from 'koa';
import path from 'path';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import mount from 'koa-mount';
import opener from 'opener';
import compose from 'koa-compose';
import favicon from 'koa-favicon';

import routerHandler from './api/routes';
import connectionDb from './db/requests';
import socketWrapper from './middleware/socketMiddleware';

// server logs on client
// require('node-monkey').start({host: "127.0.0.1", port:"50500"});

let router = require('koa-router')();
let app = koa();


//server settings
let appSettings = compose([
	favicon(__dirname + '/views/favicon/fav.ico'),
	hbs.middleware({ viewPath: __dirname + '/views' }),
	mount('/assets', serve(path.join(__dirname, '../../build'))),
	router.routes(),
	router.allowedMethods(),
	serve(__dirname)
]);

app.use(appSettings);

// REST
routerHandler(router);

// first render
router.get('*', function *(next){
	yield this.render('index');
})


app.server = http.createServer(app.callback()).listen(3000);

// socket for emit event on changes in db
const io = require('socket.io')(app.server);
socketWrapper(io, connectionDb);

opener('http://localhost:3000');
