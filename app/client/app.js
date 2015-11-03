'use strict';

//modules
import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-sortable';
import 'ng-dialog';

//directives
import helloWorld from 'client/components/main/hello-world';
import boardHeader from 'client/components/board-header';
import boardFooter from 'client/components/board-footer';

//factories
import socketFactory from 'client/factories/socket'

//controllers
import sortableController from 'client/controllers/sortableController';

//config
import config from 'client/config/config';

import n from 'shared/num';
console.log(n);

let app = angular.module('app', ['ui.router', 'ui.sortable', 'ngDialog'])
	.factory('socket', socketFactory)
	.directive('helloWorld', helloWorld)
	.directive('boardHeader', boardHeader)
	.directive('boardFooter', boardFooter)
	.controller('sortableController', sortableController)
	.config(config);

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
