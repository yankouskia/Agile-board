'use strict';

import {DB_CHANGE} from '../../shared/socketEventTypes';

export default (io, db) => {
	io.on('connection', (socket) => {
		console.log('socket instance connected on server');
		db.remoteDB.changes({
			since: 'now',
			live: true,
			include_docs: true
		}).on('change', function(change) {
			socket.emit(DB_CHANGE, change);
		});
	});
};
