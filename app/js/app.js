'use strict'
angular.module('app',['ngResource','ui.router','app.services','app.filters','app.items']);
angular.module('app').run(['$state', function($state) {
  $state.go('allItems');
}]);
