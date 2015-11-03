'use strict';

export default (io) => {
	io.on('connection', (socket) => {
		console.log('socket instance', 'connected on server');
		socket.on('add task', function (data) {
		    console.log(data);
		});
	});
};
