'use strict';

export default (socket) => {

    let taskCtrl = function() {
        let {description, title} = this.task;
        this.description = description;
        this.title = title;
    }


    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: require('./task.html'),
        controllerAs: 'taskCtrl',
        controller: taskCtrl,
        bindToController: {
            task: '=task',
            index: '=index'
        }
    }
};
