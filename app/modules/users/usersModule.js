'use strict'
angular.module('app.users',['app.users.controllers','app.users.services'])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('users', {
		url: '/users',
		abstract: true,
		controller: 'UsersMainController',
		templateUrl: 'modules/users/views/users-home.html'
	})
	.state('users.new', {
    url: '',
    controller: 'UsersNewController',
    templateUrl: '/modules/users/views/new-users.html',
    data: {
    	requiredAdmin: true
    }
	})
	.state('users.accepted', {
    url: '/accepted',
    controller: 'UsersAcceptedController',
    templateUrl: '/modules/users/views/accepted-users.html',
    data: {
    	requiredAdmin: true
    }
  	})
}]);
