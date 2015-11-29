'use strict';

export default (StoryService) => {

    let ClosedTasksCtrl = function() {
        console.log(StoryService.closedItems);
        this.closedTasks = StoryService.closedItems;
    }


    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: require('./closed-tasks.html'),
        controllerAs: 'ClosedTasksCtrl',
        controller: ClosedTasksCtrl,
        bindToController: {}
    }
};
