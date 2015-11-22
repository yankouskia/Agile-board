'use strict';

export default function ($scope) {  // value provider  // remove this shit
	$scope.tasks = [ // don't use scope. prefer controller as syntax. Why ?
		[
			{
			  	title: 'Control mask',
			  	description: 'implement mask control'
			}, {
			  	title: 'router ui',
			  	description: 'add view route'
			}
		],
		[
			{
			  	title: 'db',
			  	description: 'install rethink db'
			}, {
			  	title: 'Control textbox',
			  	description: 'implement textbox'
			}
		],
		[
			{
			  	title: 'LESS',
			  	description: 'use less with bootstrap 3'
			}, {
			  	title: 'DOCKER',
			  	description: 'install docker image'
			}, {
			  	title: 'dnd',
			  	description: 'add drag n drop to board'
			}
		]
	];  

	$scope.columns = [
		{
			title: 'To Do',
			options: createOptions('todo'),

			tasks: [
				{
			  		title: 'Control mask',
			  		description: 'implement mask control'
				}, 
				{
			  		title: 'router ui',
			  		description: 'add view route'
				}

			]
		},
		{
			title: 'In Progress',
			options: createOptions('progress'),
			tasks: []
		},
		{
			title: 'Done',
			options: createOptions('done'),
			tasks: []
		}

	]

	$scope.sortingLog = [];

	function createOptions(name) {
		var options = {
			name: name,
		  	placeholder: 'board__info__container',
		  	connectWith: '.board__info'
		};
		return options;
	}

		$scope.sortableOptionsList = [createOptions('A'), createOptions('B'), createOptions('C')]; // move to constants or value or service

	$scope.logModels = function () {
		$scope.sortingLog = [];
		for (var i = 0; i < $scope.tasks.length; i++) {
			var logEntry = $scope.tasks[i].map(function (x) {
				return x.title;
			}).join(', ');
			logEntry = 'container ' + (i+1) + ': ' + logEntry;
			$scope.sortingLog.push(logEntry);
		}
	};
}
