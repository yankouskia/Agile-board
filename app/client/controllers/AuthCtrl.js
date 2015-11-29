'use strict';

export default ($scope, AuthService)  => {

	$scope.isOk = false;
	$scope.user = {
		login: '',
		password: '',
		passwordRepeat: ''
	};

	$scope.authUser = {
		login: '',
		password: ''
	};

	$scope.name = null;
	$scope.isReg = false;

	$scope.incorrectAuth = false;
	$scope.incorrect = false;

	$scope.auth = async () => {
		let {login, password} = $scope.authUser;
		if(login && password) {
			console.log(login, password);
			$scope.incorrectAuth = false;
			let user = await AuthService.getUserById($scope.authUser);
			if(user) {
				$scope.name = user.login;
				window.userName = user.login;
				$scope.isOk = true;
			} else {
				$scope.isOk = false;
				window.userName = null;
				$scope.name = null;
			}
		} else {
			$scope.incorrectAuth = true;
			window.userName = null;
		}
		$scope.$apply();
	}

	$scope.getUser = async () => {
		let user = await AuthService.getUserById($scope.user);
		if(user) {
			$scope.isOk = true;
			$scope.name = user.login;
		} else {
			$scope.isOk = false;
			$scope.name = null;
		}
		$scope.$apply();
	}

	$scope.createUser = async () => {
		await AuthService.createUser($scope.user);
	}

	$scope.reg = () => {
		let {login, password, passwordRepeat} = $scope.user;
		if(password && login && passwordRepeat && passwordRepeat === password) {
			$scope.createUser();
			$scope.incorrect = false;
			$scope.isReg = true;
		} else {
			$scope.incorrect = true;
			$scope.isReg = false;
		}
		console.log($scope.user);
	}
}
