'use strict'
angular.module('app',[
	'ngResource',
	'ui.router',
	'satellizer',
  'pascalprecht.translate',
	'app.services',
	'app.filters',
  'app.directives',
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
        $rootScope.userProfile = authService.profile();
      }
      if(toState.data && toState.data.requiredAdmin && !authService.isStaff()) {
        event.preventDefault();
        $state.go('authLogin');
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
  		$rootScope.userProfile = authService.profile(); 
  });
  $rootScope.$on('USER_LOGOUT_EVENT', function() {
  	$rootScope.userProfile = undefined;
  });
}]);
angular.module('app').config(['$authProvider', '$translateProvider', function($authProvider, $translateProvider) {
	//
	/*function skipIfLoggedIn($q, $auth) {
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
	}*/
$translateProvider.useStaticFilesLoader({
    files: [{
        prefix: '/i18n/locale-',
        suffix: '.json'
    },
    {
        prefix: '/i18n/locale-',
        suffix: '.json'
    }]
});
$translateProvider.preferredLanguage('en');
$translateProvider.useSanitizeValueStrategy('sanitize');
}]);
