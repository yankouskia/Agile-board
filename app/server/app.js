'use strict';

import koa from 'koa';
import path from 'path';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import mount from 'koa-mount';
import opener from 'opener';
import compose from 'koa-compose';
// var r = require('rethinkdbdash')({
//       host: '10.0.2.15',
//       port: 28015,
//       authKey: "",
//       db: 'agiledb'
// });
// var r = require('rethinkdb')
// r.connect({ host: 'epbyminw3243.minsk.epam.com', port: 28015 }, function(err, conn) {
//   if(err) throw err;
//   r.db('agiledb').run(conn, function(err, res) {
//     if(err) throw err;
//     console.log(res);
//     r.table('users').insert({ name: 'Star Trek TNG' }).run(conn, function(err, res)
//     {
//       if(err) throw err;
//       console.log(res);
//     });
//   });
// });

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
	// try {
	// 	var result = yield r.table('users').get('orphee@gmail.com').update({name: 'Michel'});
	// 	console.log(result);
	// }
	// catch (e) {
	// 	console.log(e);
	// }
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

/*let server = */app.listen(3000, function() {
    console.log('Koa is listening to http://localhost:3000');
    opener('http://localhost:3000');
});