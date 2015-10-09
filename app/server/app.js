import koa from 'koa';
import path from 'path';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import mount from 'koa-mount';
import opener from 'opener';
import compose from 'koa-compose';
let router = require('koa-router')();
let app = koa();


let appSettings = compose([
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

// app.use(hbs.middleware({
// 	viewPath: __dirname + '/views'
// }));

// app.use(
// 	mount('/assets', serve(path.join(__dirname, '../../build')))
// );


// app.use(router.routes()).use(router.allowedMethods());

// app.use(serve(__dirname));

let server = app.listen(3000, function() {
    console.log('Koa is listening to http://localhost:3000');
    opener('http://localhost:3000');
});