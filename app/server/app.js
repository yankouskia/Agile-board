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

let Router = require('koa-router');
let app = koa();


// trust proxy
app.proxy = true;

// sessions
var session = require('koa-generic-session');
app.keys = ['your-session-secret'];
app.use(session());

// body parser
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// authentication
require('./auth');
var passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

// append view renderer
var views = require('koa-render');
app.use(views('./views', {
  map: { html: 'handlebars' },
  cache: false
}));



var publicRoute = new Router()

publicRoute.get('/login', function*() {
	console.log('login again');
	this.body = yield this.render('login')
})

publicRoute.post('/custom', function*(next) {
  var ctx = this
  yield passport.authenticate('local', function*(err, user, info) {
    if (err) throw err
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      yield ctx.login(user)
      ctx.body = { success: true }
    }
  }).call(this, next)
})

// POST /login
publicRoute.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

publicRoute.get('/logout', function*(next) {
  this.logout()
  this.redirect('/login')
})

// publicRoute.get('/auth/facebook',
//   passport.authenticate('facebook')
// )

// publicRoute.get('/auth/facebook/callback',
//   passport.authenticate('facebook', {
//     successRedirect: '/app',
//     failureRedirect: '/'
//   })
// )

// publicRoute.get('/auth/twitter',
//   passport.authenticate('twitter')
// )

// publicRoute.get('/auth/twitter/callback',
//   passport.authenticate('twitter', {
//     successRedirect: '/app',
//     failureRedirect: '/'
//   })
// )

// publicRoute.get('/auth/google',
//   passport.authenticate('google')
// )

// publicRoute.get('/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/app',
//     failureRedirect: '/'
//   })
// )

app.use(publicRoute.middleware())

// Require authentication for now
app.use(function*(next) {
  if (this.isAuthenticated()) {
  	console.log('ffff');
    yield next;
  } else {
    this.redirect('/login');
  }
});


let router = new Router();
//server settings


let appSettings = compose([
	favicon(__dirname + '/views/favicon/fav.ico'),
	hbs.middleware({ viewPath: __dirname + '/views' }),
	mount('/assets', serve(path.join(__dirname, '../../build'))),
	router.routes(),
	router.allowedMethods(),
	serve(__dirname)
]);


// REST
routerHandler(router);

// first render
router.get('/', function *(next){
	console.log('234345')
	yield this.render('index');
	//this.body = yield this.render('index');
})


app.use(appSettings);


// app.use(router.middleware())

app.server = http.createServer(app.callback()).listen(3000);

// socket for emit event on changes in db
const io = require('socket.io')(app.server);
socketWrapper(io, connectionDb);

opener('http://localhost:3000');
