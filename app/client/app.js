import angular from 'angular';
let ngModule = angular.module('app', []);
require('./main/hello-world')(ngModule);

let hello = document.createElement('hello-world');
document.body.appendChild(hello);