'use strict';
import {DB_CHANGE} from 'shared/socketEventTypes';

const requestCallback = ($scope) => {
	return $scope.$apply;
}

export default ($scope, StoryService, socket)  => {

	$scope.tasks = StoryService.tasks;
	$scope.columns = StoryService.columns;

	socket.on(DB_CHANGE, () => {
        console.log('db cnanged!!!!');
        StoryService.getStories(requestCallback($scope));
    });

	StoryService.getStories(requestCallback($scope));
}
