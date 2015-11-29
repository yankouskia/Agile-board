'use strict';

//modules
import angular from 'angular';
import 'angular-ui-router';
import 'angular-ui-sortable';
var uibs = require('angular-ui-bootstrap');

//directives
import task from 'client/components/task/task';
import tasksList from 'client/components/tasks-list/tasks-list.drct'
import helloWorld from 'client/components/main/hello-world';
import boardHeader from 'client/components/board-header';
import boardFooter from 'client/components/board-footer';
import updateTask from 'client/components/update-task';
import closedTasks from 'client/components/closed-tasks';

//factories
import socketFactory from 'client/factories/socket'

// services
import StoryService from 'client/services/StoryService';

//controllers
import SortableCtrl from 'client/controllers/SortableController';
import ModalInstanceCtrl from 'client/controllers/ModalInstanceController';
import ModalCtrl from 'client/controllers/NewTaskModalController';

//config
import config from 'client/config/config';

let app = angular.module('app', ['ui.router', 'ui.sortable', uibs])
	.service('StoryService', StoryService)
	.factory('socket', socketFactory)
	.controller('SortableCtrl', SortableCtrl)
	.controller('ModalCtrl', ModalCtrl)
	.controller('ModalInstanceCtrl', ModalInstanceCtrl)
	.directive('closedTasks', closedTasks)
	.directive('updateTask', updateTask)
	.directive('tasksList', tasksList)
	.directive('task', task)
	.directive('helloWorld', helloWorld)
	.directive('boardHeader', boardHeader)
	.directive('boardFooter', boardFooter)
	.directive('boardColumn', require('client/components/board-column/board-column.drct'))
	.config(config);

angular.element(document).ready(() => {
	angular.bootstrap(document, [app.name]);	
});
