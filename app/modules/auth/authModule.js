'use strict'
angular.module('app.auth',['app.auth.controllers'])
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('authLogin', {
    url: '/auth/login',
    controller: 'AuthLoginController',
    templateUrl: '/modules/auth/views/login.html'
  })
  .state('authSignUp', {
    url: '/auth/signup',
    controller: 'AuthSignUpController',
    templateUrl: '/modules/auth/views/signup.html'
  })
}]);
