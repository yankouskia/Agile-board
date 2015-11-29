'use strict';

export default (StoryService) => {

    let TaskCtrl = function() {
        let {description, title} = this.task;
        this.description = description;
        this.title = title;

        this.close = (p) => {
            p.status = 'closed';
            StoryService.updateStory(p);
        };

        this.deleteTask = (task) => {
            console.log('delete', task);
            StoryService.deleteStory(task);
        };
    }


    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: require('./task.html'),
        controllerAs: 'TaskCtrl',
        controller: TaskCtrl,
        bindToController: {
            task: '=task',
            index: '=index'
        }
    }
};
