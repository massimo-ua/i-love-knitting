'use strict'
angular.module('app.auth',['app.auth.controllers'])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
  .state('authLogin', {
    url: '/auth/login',
    controller: 'AuthLoginController',
    templateUrl: '/modules/auth/views/login.html'
  })
}]);
