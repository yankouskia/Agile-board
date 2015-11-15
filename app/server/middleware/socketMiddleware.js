'use strict';

export default (io, db) => {
	io.on('connection', (socket) => {
		console.log('socket instance connected on server');
		db.remoteDB.changes({
			since: 'now',
			live: true,
			include_docs: true
		}).on('change', function(change) {
			socket.emit('db change', change);
		});
	});
};
