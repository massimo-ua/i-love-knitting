'use strict'
angular.module('app.items.controllers', ['ngAnimate'])
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
    $scope.item = response;
    if($scope.item.images != undefined) {
      $scope.item.images[0].visible = true;
    }
  });
}]);
