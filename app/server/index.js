'use strict';

process.env.NODE_PATH = 'app';
require('module').Module._initPaths();

require('babel/register-without-polyfill');
require('./app');