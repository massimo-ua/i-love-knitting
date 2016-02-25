'use strict'
angular.module('app.items.controllers', [])
.controller('allItemsController', ['$scope', 'Item', function($scope, Item) {
  $scope.allItems = Item.query();
}]);
