'use strict'
angular.module('app.items',['app.items.controllers','app.items.directives'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('allItems', {
    url: '/items',
    templateUrl: '/modules/items/views/all-items.html',
    controller: 'allItemsController'
  })
  .state('singleItem', {
    url: '/items/:id/:permalink',
    templateUrl: '/modules/items/views/single-item.html',
    controller: 'singleItemController'
  });
  $urlRouterProvider.otherwise('/items');
}]);
