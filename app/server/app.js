'use strict';

import http from 'http';
import koa from 'koa';
import path from 'path';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import mount from 'koa-mount';
import opener from 'opener';
import compose from 'koa-compose';

import socketWrapper from './middleware/socketMiddleware';
var favicon = require('koa-favicon');

let router = require('koa-router')();
let app = koa();

import db from './db/requests';

let appSettings = compose([
	favicon(__dirname + '/views/favicon/fav.ico'),
	hbs.middleware({ viewPath: __dirname + '/views' }),
	mount('/assets', serve(path.join(__dirname, '../../build'))),
	router.routes(),
	router.allowedMethods(),
	serve(__dirname)
]);

app.use(appSettings);

router.get( '*', function *(next){
	yield this.render('index');
})

var connectionDb = new db();

app.server = http.createServer(app.callback()).listen(3000);
const io = require('socket.io')(app.server);
socketWrapper(io, connectionDb);

opener('http://localhost:3000');
