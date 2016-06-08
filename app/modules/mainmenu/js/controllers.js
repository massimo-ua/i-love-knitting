'use strict'
angular.module('app.mainmenu.controllers',[])
.controller('mainMenuController', ['$scope', 'authService', function($scope, authService){
	$scope.logout = function() {
		authService.logout().then(function(response){
			console.log(response);
			$scope.$emit('USER_LOGOUT_EVENT');
		});
	}
}]);