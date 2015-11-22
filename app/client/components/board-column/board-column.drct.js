'use strict';

export default () => {
	
	let BoardColumnCtrl = function() {
		let {title, tasks, options} = this.column;
		this.title = title;
		this.tasks = tasks;
		this.options = options;
		
	};

	return {
		scope: {},
		restrict: 'E',
		replace: true,
		template: require('./board-column.html'),
		controller: BoardColumnCtrl,
		controllerAs: 'BoardColumnCtrl',
		bindToController: {
			column: '=column'
		}
	}
}
