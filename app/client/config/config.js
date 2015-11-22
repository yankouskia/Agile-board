'use strict';

//pages
import home from 'client/pages/index.html';
import about from 'client/pages/about.html';
import board from 'client/pages/partial/board.html';
import auth from 'client/pages/auth.html';
import information from 'client/pages/partial/information.html';

export default function($urlRouterProvider, $stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/home/board');

	$stateProvider // move to router module like app.router.js
		.state('home', {
			url: '/home',
			template: home  //should be directives like components in React
		})
		.state('about', {
			url: '/about',
			template: about
		})
		.state('auth', {
			url: '/auth',
			template: auth
		})
		.state('home.board', {
			url: '/board',
			template: board //split into small reausable directives
		})
		.state('home.information', {
			url: '/information',
			template: information
		});		
}
