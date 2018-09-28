describe('TodoCtrl', function() {
	var scope;
	
	beforeEach(angular.mock.module('todo'));
	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('TodoCtrl', {$scope: scope});
	}));

	it("Checks the task creation", function () {
		var size = scope.tasks.length;
		scope.createTask({ title: 'Hello' });
		expect(scope.tasks.length).toEqual(size+1);
	});
});