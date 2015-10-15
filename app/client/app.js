'use strict';

import angular from 'angular';
import home from './pages/index.html';
import about from './pages/about.html';
require('angular-ui-router');

let app = angular.module('app', ['ui.router'])
	.directive('helloWorld', require('./components/main/hello-world'))
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	    $urlRouterProvider.otherwise('/home');
	    $stateProvider
			.state('home', {
				url: '/home',
				template: home
			})
			.state('about', {
				url: '/about',
				template: about
			})
	}]);

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
