'use strict'
angular.module('app.auth.controllers', [])
.controller('AuthLoginController', ['$scope', '$state', 'authService', function($scope, $state, authService) {
	$scope.buttonText = 'Login';
	$scope.login = function() {
		$scope.buttonText = 'Loging in ...'
		authService.login($scope.auth.email, $scope.auth.password)
		.then(function(response){
			//if login succesful emit broadcast message for changes in profile menu
			$scope.$emit('USER_LOGIN_EVENT');
			$state.go('allItems');
		})
		.catch(function(response){
				console.log(response);
				$scope.invalidLogin = response.data.message;
		})
		.finally(function(){
			$scope.buttonText = 'Login';
		});
	}
	$scope.logout = function() {
		authService.logout().then(function(response){
			$scope.$emit('USER_LOGOUT_EVENT');
			$state.go('allItems');
		});
	}
}])
.controller('AuthSignUpController', ['$scope', '$state', 'authService', function($scope, $state, authService) {
	$scope.buttonText = 'Sign Up';
	$scope.signup = function() {
		if($scope.user.password != $scope.password2) {
			$scope.signupForm.password2.$invalid
			$scope.signupForm.password.$invalid
			$scope.passwordmismatch = true;
			return;
		}
		$scope.buttonText = 'Signing Up...';
		authService.signup($scope.user)
		.then(function(response){
			/*if signup succesful show message to inform user
			*that administrator must approve this new account
			*/
			$scope.successSignUp = "Account registration successful!"

		})
		.catch(function(response){
			console.log(response);
			$scope.invalidSignUp = response.data.message;
		})
		.finally(function(){
			$scope.buttonText = 'Sign Up';
			$scope.password = $scope.password2;
		})
	}
}]);