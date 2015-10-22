'use strict';

import angular from 'angular';
import home from './pages/index.html';
import about from './pages/about.html';
import board from './pages/partial/board.html';
import information from './pages/partial/information.html';
require('angular-ui-router');

let app = angular.module('app', ['ui.router'])
	.directive('helloWorld', require('./components/main/hello-world'))
	.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {
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
	}]);

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
