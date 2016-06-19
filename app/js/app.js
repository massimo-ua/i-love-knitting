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
	'app.users'
	]);
angular.module('app').run(['$rootScope', '$state', 'authService', '$http', function($rootScope, $state, authService, $http) {
  authService.setStorageType('localStorage');

  $rootScope.$on('$stateChangeStart', function(event, toState){
  	if(authService.isAuthenticated()) {
  		if(!$rootScope.userProfile) {
  			authService.profile().then(function(response){
  				$rootScope.userProfile = response.data;
  				if(toState.data && toState.data.requiredAdmin && !$rootScope.userProfile.isStaff) {
  					event.preventDefault();
  					$state.go('authLogin');
  				}
  			}); 
  		}
      else {
  		  if(toState.data && toState.data.requiredAdmin && !$rootScope.userProfile.isStaff) {
  			 event.preventDefault();
  			 $state.go('authLogin');
  		  }
      }
  	}
  	else {
  		if(toState.data && (toState.data.requiredLogin || toState.data.requiredAdmin)) {
  			event.preventDefault();
  			$state.go('authLogin');
  		}
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
