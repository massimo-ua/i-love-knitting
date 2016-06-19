'use strict'
angular.module('app.users.controllers',[])
.controller('UsersMainController',[function(){
	console.log('UsersMainController');
}])
.controller('UsersNewController',['$scope','Api', 'popupService', function($scope, Api, popupService){
	Api.User.query({}, function(response) {
		$scope.users = response;
	});
	$scope.setApprove = function(user) {
		$scope.errorMessage = undefined;
		$scope.successMessage = undefined;
		var updater = angular.copy(user);
		updater.approved = user.approved ? false : true;
		updater.$update(function(response){
			$scope.successMessage = 'Account #' + user._id + ' updated successfully!';
			user.approved = user.approved ? false : true;
		}, function(err){
			$scope.errorMessage = 'Account #' + user._id + ' update error: ' + err.data.error.status + ' ' + err.data.message;
		});
		updater = undefined;
	}
	$scope.setStaff = function(user) {
		$scope.errorMessage = undefined;
		$scope.successMessage = undefined;
		var action = user.isStaff ? 'revoke' : 'grant';
		if(popupService.showPopup('Do You really want '+action+' Administrative Rights for account #'+user._id+'\n'+user.displayName+'\n'+user.email+'?')) {
			var updater = angular.copy(user);
			updater.isStaff = user.isStaff ? false : true;
			updater.$update(function(response){
				$scope.successMessage = 'Administrative Rights was successfully changed for account #' + user._id+'!';
				user.isStaff = user.isStaff ? false : true;
			}, function(err){
				$scope.errorMessage = 'Account #' + user._id + ' update error: ' + err.data.error.status + ' ' + err.data.message;
			});
			updater = undefined;
		}
	}
}])
.controller('UsersAcceptedController',[function(){
	console.log('UsersAcceptedController');
}]);