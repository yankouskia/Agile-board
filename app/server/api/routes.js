'use strict';

import taskCtrl from '../controllers/task';

export default (router) => {
	router
		.get('/task/get/:id', taskCtrl.getById)
		.get('/task/getAll/', taskCtrl.getAll)
		.post('/task/add', taskCtrl.add)
		.post('/task/update', taskCtrl.update)
		.post('/task/delete', taskCtrl.deleteTask)
};
