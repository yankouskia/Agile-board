'use strict';

export default ($stateParams, StoryService) => {

    let UpdateTaskCtrl = function() {
        this.isChanged = false;

        this.saveStory = () => {
            this.isChanged = false;
            StoryService.updateStory(this.item);
        };

        this._onChange = () => {
            this.isChanged = true;
        }
    }


    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: require('./update-task.html'),
        controllerAs: 'UpdateTaskCtrl',
        controller: UpdateTaskCtrl,
        bindToController: {
            item: '=item'
        }
    }
};
