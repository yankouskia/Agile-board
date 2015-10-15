'use strict';

export default () => {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: require('./hello-world.html'),
        controllerAs: 'helloWorldCtrl',
        controller: function () {
            this.greeting = 'Agile board'; 
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
