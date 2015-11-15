'use strict';
import io from 'socket.io-client';

export default ($rootScope) => {
	let socket = io.connect('http://localhost:3000');
	socket.on('connect', () => {
		console.log('connected');
	});
	return {
		on: function (eventName, callback) {
			socket.on(eventName, function () {  
					let args = arguments;
					$rootScope.$apply(function () {
						callback.apply(socket, args);
				});
			});
		},
		emit: function (eventName, data, callback) {
			socket.emit(eventName, data, function () {
				let args = arguments;
				$rootScope.$apply(function () {
					if (callback) {
						callback.apply(socket, args);
					}
				});
			})
		}
	};
}
