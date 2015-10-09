var koa = require('koa');
var app = koa();
var path = require('path');
var hbs = require('koa-hbs');
var router = require('koa-router')();
var serve = require('koa-static');
import mount from 'koa-mount';
import opener from 'opener';


app.use( hbs.middleware({
      viewPath: __dirname + '/views'
}));

app.use(
	mount('/assets', serve(path.join(__dirname, '../../build')))
);

router.get( '*', function *(next){

      yield this.render('index');
})

app.use(router.routes()).use(router.allowedMethods());

app.use(serve(__dirname));

var server = app.listen(3000, function() {
    console.log('Koa is listening to http://localhost:3000');
    opener('http://localhost:3000');
});