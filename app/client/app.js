'use strict';

import angular from 'angular';

let app = angular.module('app', [])
	.directive('helloWorld', require('./components/main/hello-world'));

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
