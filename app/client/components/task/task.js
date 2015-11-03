'use strict';

export default (socket) => {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: require('./task.html'),
        controllerAs: 'taskCtrl',
        controller: function () {
            this.greeting = 'Agile board'; 
        },
        link: function($scope) {
            $scope.clickMe= function() {
                socket.emit('add task', {hello: 'world'});
            }
        }
    }
};
