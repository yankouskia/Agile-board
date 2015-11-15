'use strict';

export default (socket) => {

    let TaskCtrl = function() {
        let {description, title} = this.task;
        this.description = description;
        this.title = title;
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
