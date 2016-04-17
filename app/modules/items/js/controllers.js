'use strict'
angular.module('app.items.controllers', [])
.controller('allItemsController', ['$scope', 'Api', function($scope, Api) {
  Api.Item.query({},
  	function(response){
  			$scope.allItems = response;
  });
  
}])
.controller('singleItemController', ['$scope', '$stateParams', 'Api', function($scope, $stateParams, Api) {
  $scope.closeItem = function() {
    $state.go('allItems');
  }
  Api.Item.get({ id:$stateParams.id }, function(response) {
    $scope.item = response.data;
  });
}]);
