'use strict'
angular.module('app.items.controllers', [])
.controller('allItemsController', ['$scope', 'Api', function($scope, Api) {
  $scope.allItems = Api.Item.query();
}])
.controller('singleItemController', ['$scope', '$stateParams', 'Api', function($scope, $stateParams, Api) {
  $scope.closeItem = function() {
    $state.go('allItems');
  }
  Api.Item.get({ id:$stateParams.id }, function(response) {
    $scope.item = response.data;
  });
}]);
