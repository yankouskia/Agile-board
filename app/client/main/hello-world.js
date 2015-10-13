export default () => {
    return {
        restrict: 'E',
        scope: {},
        template: require('./hello-world.html'),
        controllerAs: 'vm',
        controller: function () {
            const vm = this;
            vm.greeting = 'Hello world';
        }
    }
}