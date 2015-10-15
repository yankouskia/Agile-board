'use strict';

import angular from 'angular';
require('angular-ui-router');

let app = angular.module('app', ['ui.router'])
	.directive('helloWorld', require('./components/main/hello-world'))
	.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
	    $urlRouterProvider.otherwise('/home');
	    $stateProvider
			.state('home', {
				url: '/home',
				views: {
	                        main: {
	                            templateUrl: 'pages/index.html'
	                        }
	                    }
			})
			.state('about', {
				url: '/about',
				views: {
	                        main: {
								templateUrl: 'pages/about.html'
	                        }
	                    }
			})
	}]);

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
