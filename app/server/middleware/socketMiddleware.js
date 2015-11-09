'use strict';

export default (io, db) => {
	io.on('connection', (socket) => {
		console.log('socket instance', 'connected on server');
		socket.on('add task', function (data) {
		    console.log(data);
		    db.addTask({
		    	name: 'New story about ui-router',
		    	title: 'new task'
		    });
		});
		socket.on('get task', function (id) {
		    console.log(id);
		    let task = db.getTaskById(id);
		    socket.emit('get task', task);
		});
	});
};
