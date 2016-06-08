'use strict'
angular.module('app',[
	'ngResource',
	'ui.router',
	'satellizer',
	'app.services',
	'app.filters',
	'app.items',
	'app.admin',
	'app.auth',
	'app.mainmenu'
	]);
angular.module('app').run(['$rootScope', '$state', 'authService', '$http', function($rootScope, $state, authService, $http) {
  authService.setStorageType('localStorage');
  if(authService.isAuthenticated() && !$rootScope.userProfile) {
  	authService.profile().then(function(response){
  		$rootScope.userProfile = response.data;
  	}); 
  }
  $rootScope.$on('$stateChangeStart', function(event, toState){
  	var requiredLogin = false;
  	if(toState.data && toState.data.requiredLogin)
  		requiredLogin = true;
  	if(requiredLogin && !authService.isAuthenticated()) {
  		event.preventDefault();
  		$state.go('authLogin');
  	}
  });
  $rootScope.$on('USER_LOGIN_EVENT', function() {
  	authService.profile().then(function(response){
  		$rootScope.userProfile = response.data;
  	}); 
  });
  $rootScope.$on('USER_LOGOUT_EVENT', function() {
  	$rootScope.userProfile = undefined;
  });
  //$state.go('allItems');
}]);
angular.module('app').config(['$authProvider', function($authProvider) {
	//
	function skipIfLoggedIn($q, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.reject();
		} else {
			deferred.resolve();
		}
		return deferred.promise;
	}
	function loginRequired($q, $injector, $auth) {
		var deferred = $q.defer();
		if ($auth.isAuthenticated()) {
			deferred.resolve();
		} else {
			var $state = $injector.get('$state');
			$state.go('authLogin');
		}
		return deferred.promise;
	}
}]);
