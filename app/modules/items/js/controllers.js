'use strict'
angular.module('app.items.controllers', ['ngAnimate','ngSanitize'])
.controller('allItemsController', ['$scope', 'Api', function($scope, Api) {
  Api.Item.query({},
  	function(response){
  			$scope.allItems = response;
  });
  $scope.page = 1;
  $scope.loadable = true;
  $scope.buttonText = "Load Next";
  $scope.loadNext = function() {
    $scope.page += 1;
    $scope.buttonText = "Loading...";
    Api.Item.query({page: $scope.page}, function(response) {
      console.log(response);
      if(response.length > 0) {
        $scope.allItems = $scope.allItems.concat(response);
        $scope.buttonText = "Load Next";
      }
      else {
        $scope.loadable = false;
      }
    });
  }
  
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
