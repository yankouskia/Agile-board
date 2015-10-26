'use strict';

import angular from 'angular';
import home from './pages/index.html';
import about from './pages/about.html';
import board from './pages/partial/board.html';
import information from './pages/partial/information.html';
require('angular-ui-router');
require('angular-ui-sortable');

let app = angular.module('app', ['ui.router', 'ui.sortable'])
	.directive('helloWorld', require('./components/main/hello-world'))
	.config(function($urlRouterProvider, $stateProvider, $locationProvider) {
	    $locationProvider.html5Mode(true);
	    $urlRouterProvider.otherwise('/home/board');
	    $stateProvider
			.state('home', {
				url: '/home',
				template: home
			})
			.state('about', {
				url: '/about',
				template: about
			})
			.state('home.board', {
				url: '/board',
				template: board
			})
			.state('home.information', {
				url: '/information',
				template: information
			});		
	})
	.controller('sortableController', function ($scope) {  
		$scope.tasks = [
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
  
  		$scope.sortingLog = [];
  
		function createOptions(name) {
			var options = {
				name: name,
			  	placeholder: 'board__info__container',
			  	connectWith: '.board__info'
			};
			return options;
		}

  		$scope.sortableOptionsList = [createOptions('A'), createOptions('B'), createOptions('C')];
  
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
});

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
