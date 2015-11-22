'use strict';

import PouchDB from 'pouchdb';

class DBConnection {
	constructor() {
		this.remoteDB = new PouchDB('http://localhost:5984/agile');

		this.remoteDB.info().then(function (info) {
		  console.log('!!!!!!!!!!!!', info);
		});

		this.remoteDB.changes({
			since: 'now',
			live: true,
			include_docs: true
		}).on('change', function(change) {
			console.log('change', change);
		}).on('complete', function(info) {
			console.log('complete', info);
		}).on('error', function (err) {
			console.log('err', err);
		});
	}

	addTask(task) {
		return this.remoteDB.post(task);
	}

	updateTask(task) {
		return this.remoteDB.put(task);
	}

	getTaskById(id) {
		return this.remoteDB.get(id);
	}

	getTasks() {
		return this.remoteDB.allDocs({
			include_docs: true,
			attachments: false
		});
	}
}

export default new DBConnection();
