'use strict'
angular.module('app',['ngResource','ui.router','app.items']);
angular.module('app').run(['$state', function($state) {
  $state.go('allItems');
}]);