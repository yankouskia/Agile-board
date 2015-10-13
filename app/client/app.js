import angular from 'angular';
angular.module('app', []).
	directive('helloWorld', require('./main/hello-world'));

angular.element(document).ready(function () {
    console.log('completed');
});