'use strict'
angular.module('app.admin.controllers',[])
.controller('AdminMainController', [function() {
	console.log('AdminMainController');
}])
.controller('AdminNewItemController',['$scope', '$state', 'Api', function($scope, $state, Api){
	$scope.Form = {};
  $scope.item = new Api.Item();
  $scope.buttonText = "Create";
  $scope.saveItem = function() {
    $scope.buttonText = "Saving...";
    $scope.item.$save(function(){
      $state.go('admin.itemsViewAll');
    });
  }
}])
.controller('AdminItemsListController', ['$scope','Api', '$state', function($scope, Api, $state) {
	Api.Item.query({}, function(result){
  		if(result.status == 'OK') {
  			$scope.itemsList = result.data;
  		}
  		else {
  			console.log(result.status);
  		}
  });
}]);