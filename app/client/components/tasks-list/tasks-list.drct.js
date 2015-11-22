'use strict';

export default () => {
	
	let TasksListCtrl = function() {
		this.tasks = ((cols) => {
			let tasks = [];
			cols.forEach((col) => {
				tasks = tasks.concat(col.tasks);
			});
			return tasks;
		})(this.columns);
		
	};

	return {
		scope: {},
		restrict: 'E',
		replace: true,
		template: require('./tasks-list.html'),
		controller: TasksListCtrl,
		controllerAs: 'TasksListCtrl',
		bindToController: {
			columns: '=columns'
		}
	}
}
