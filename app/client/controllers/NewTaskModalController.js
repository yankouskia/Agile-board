'use strict';
import newTaskModal from 'client/templates/newTaskModal.html';

export default ($scope, $uibModal, $log, StoryService) => {

    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: true,
            template: newTaskModal,
            controller: 'ModalInstanceCtrl'
        });

        modalInstance.result.then(function (storyInfo) {
                $scope.selected = storyInfo;
                let newStory = Object.assign({}, storyInfo.info);
                StoryService.createStory(newStory);
            }, function () {
                console.log('Modal dismissed at: ' + new Date());
        });
    };
};
