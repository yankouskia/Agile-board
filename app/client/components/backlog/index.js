'use strict';

export default (StoryService) => {

    let BacklogCtrl = function() {
        console.log(StoryService.backlog);
        this.backlog = StoryService.backlog;

        this.toSprint = (task) => {
            task.status = 'todo';
            StoryService.updateStory(task);
            for(let i = 0; i < this.backlog.length; i++) {
                if(this.backlog[i]._id === task._id) {
                    this.backlog.splice(i, 1);
                    break;
                }
            }
        }
    }


    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: require('./backlog.html'),
        controllerAs: 'BacklogCtrl',
        controller: BacklogCtrl,
        bindToController: {}
    }
};
