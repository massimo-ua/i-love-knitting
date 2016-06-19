'use strict'
angular.module('app.users.controllers',[])
.controller('UsersMainController',[function(){
	console.log('UsersMainController');
}])
.controller('UsersNewController',['$scope','Api', 'userManagement', function($scope, Api, userManagement){
	Api.User.query({}, function(response) {
		$scope.users = response;
	});
	$scope.setApprove = function(user) {
		var updater = angular.copy(user);
		userManagement.setApprove(updater, function(err, response){
			if(err) {
				$scope.errorMessage = 'Account #' + user._id + ' update error: ' + err.data.error.status + ' ' + err.data.message;
			}
			else {
				$scope.successMessage = 'Account #' + user._id + ' updated successfully!';
				user.approved = user.approved ? false : true;
			}
		});
		updater = undefined;
	}
	$scope.setStaff = function(user) {
		var updater = angular.copy(user);
		userManagement.setStaff(updater, function(err, response){
			if(err) {
				$scope.errorMessage = 'Account #' + user._id + ' update error: ' + err.data.error.status + ' ' + err.data.message;
			}
			else {
				$scope.successMessage = 'Administrative Rights was successfully changed for account #' + user._id+'!';
				user.isStaff = user.isStaff ? false : true;
			}
		});
		updater = undefined;
		}
}])
.controller('UsersAcceptedController',['$scope', 'Api', 'userManagement', function($scope, Api, userManagement){
	Api.User.query({"type":"accepted"}, function(response) {
		$scope.users = response;
	});

	$scope.setApprove = function(user) {
		var updater = angular.copy(user);
		userManagement.setApprove(updater, function(err, response){
			if(err) {
				$scope.errorMessage = 'Account #' + user._id + ' update error: ' + err.data.error.status + ' ' + err.data.message;
			}
			else {
				$scope.successMessage = 'Account #' + user._id + ' updated successfully!';
				user.approved = user.approved ? false : true;
			}
		});
		updater = undefined;
	}
	$scope.setStaff = function(user) {
		var updater = angular.copy(user);
		userManagement.setStaff(updater, function(err, response){
			if(err) {
				$scope.errorMessage = 'Account #' + user._id + ' update error: ' + err.data.error.status + ' ' + err.data.message;
			}
			else {
				$scope.successMessage = 'Administrative Rights was successfully changed for account #' + user._id+'!';
				user.isStaff = user.isStaff ? false : true;
			}
		});
		updater = undefined;
	}
}]);