'use strict';

export default () => {
    return {
        restrict: 'E',
        replace: true,
        scope: true,
        template: require('./board-header.html')
    }
};
