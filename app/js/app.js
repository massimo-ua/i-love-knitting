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
angular.module('app').run(['$rootScope', '$state', '$auth', function($rootScope, $state, $auth) {
  $auth.setStorageType('localStorage');
  if($auth.isAuthenticated() && !$rootScope.userProfile) {
  	$rootScope.userProfile = {
  		displayName: 'Logged in username'
  	}
  }
  $rootScope.$on('$stateChangeStart', function(event, toState){
  	var requiredLogin = false;
  	if(toState.data && toState.data.requiredLogin)
  		requiredLogin = true;
  	if(requiredLogin && !$auth.isAuthenticated()) {
  		event.preventDefault();
  		$state.go('authLogin');
  	}
  });
  $rootScope.$on('USER_LOGIN_EVENT', function() {
  	$rootScope.userProfile = {
  		displayName: 'Logged in username'
  	}
  });
  //$state.go('allItems');
}]);
angular.module('app').config(['$authProvider', function($authProvider) {
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
