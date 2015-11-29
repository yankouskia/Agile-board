'use strict';

import home from 'client/pages/index.html';
import about from 'client/pages/about.html';
import board from 'client/pages/partial/board.html';
import auth from 'client/pages/auth.html';
import information from 'client/pages/partial/information.html';
import item from 'client/pages/item.html';
import closedTasks from 'client/pages/partial/closedTasks.html';
import reg from 'client/pages/reg.html';

export default function($urlRouterProvider, $stateProvider, $locationProvider) {
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
		.state('auth', {
			url: '/auth',
			template: auth
		})
		.state('reg', {
			url: '/reg',
			template: reg
		})
		.state('home.board', {
			url: '/board',
			template: board
		})
		.state('home.information', {
			url: '/information',
			template: information
		})
		.state('home.closed', {
			url: '/closed',
			template: closedTasks
		})
		.state('home.item', {
			url: '/:item',
			template: item,
			controller: ($scope, $stateParams) => {
				$scope.item = JSON.parse($stateParams.item);
			}
		});	
}
