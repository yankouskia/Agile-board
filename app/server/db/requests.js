'use strict';

import PouchDB from 'pouchdb';

export default class DBConnection {
	constructor() {
		this.localDB = new PouchDB('agile');
		this.remoteDB = new PouchDB('http://localhost:5984/agile');

		this.localDB.sync(this.remoteDB, {
		  	live: true
		}).on('complete', function () {
		  	console.log('dbs replicated')
		}).on('error', function (err) {
			console.log('some troubles while replicating', err);
		});;

		this.remoteDB.info().then(function (info) {
		  console.log('!!!!!!!!!!!!', info);
		});

		this.localDB.info().then(function (info) {
		  console.log('@@@@@@@@@@@@@@@', info);
		})
	}

	addTask(task) {
		task._id = task.name.toLowerCase().replace(/\s/g, '');
		localDB.put(task).then(function (response) {
		 	return response;
		}).catch(function (err) {
		 	return error;
		});
	}

	getTaskById(id) {
		// var task = null;
		return this.localDB.get(id).then((res)=>{return res});

		// .then(function (doc) {
		// 	console.log('gettttt', doc);
		// 	return doc;
		//   	task = doc;
		// }).catch(function (err) {
		//   	console.log(err);
		// });
		// return task
	}
}