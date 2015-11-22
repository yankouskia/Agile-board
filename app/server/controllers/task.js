'use strict';

import connectionDb from '../db/requests';
import parse from 'co-body';

exports.getById = function *() {
	this.body = yield connectionDb.getTaskById(this.params.id);
}

exports.getAll = function *() {
	console.log('get all!!!!');
	this.body = yield connectionDb.getTasks();
}

exports.add = function *() {
	let newTask = yield parse(this);
	yield connectionDb.addTask(newTask);
	console.log('add task!!!!!!!!', newTask);
	let message = {'ok': false};
	if(newTask) {
		message.ok = true;
	}
	this.body = message;
}

exports.update = function *() {
	let info = yield parse(this);
	yield connectionDb.updateTask(info);

	let message = {ok: false};
	if(info) {
		message.ok = true;
	}
	this.body = message;
}

