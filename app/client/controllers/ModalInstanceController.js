'use strict';

export default ($scope, $uibModalInstance) => {

	$scope.selected = {
		title: '',
		description: '',
		points: '5',
		storyType: 'Story',
		asigneee: 'Alex',
		status: 'todo'
	};

	$scope.ok = function () {
		$uibModalInstance.close({
			info: $scope.selected
		});
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
};
