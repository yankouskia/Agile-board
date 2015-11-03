'use strict';

export default (socket) => {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: require('./hello-world.html'),
        controllerAs: 'helloWorldCtrl',
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


// module lessons

// link fn change dom like bg color 
// transclude
// @, =, &
// bindToController 

// linter eslint
// eslint-config-airbnb
// hotreload
