var koa = require('koa');
var route = require('koa-route');
var app = koa();

app.use(function *() {
    this.body = 'Hello world';
});

app.use(route.get('/api/items', function*() {
    this.body = 'Get';
}));

app.use(route.get('/api/items/:id', function*(id) {
    this.body = 'Get id: ' + id;
}));

app.use(route.post('/api/items', function*() {
    this.body = 'Post';
}));

var server = app.listen(3000, function() {
    console.log('Koa is listening to http://localhost:3000');
});