'use strict'
angular.module('app.admin.controllers',[])
.controller('AdminMainController', [function() {
	console.log('AdminMainController');
}])
.controller('AdminNewItemController',['$scope', 'Api', function($scope, Api){
	$scope.Form = {};
  $scope.saveItem = function() {
    alert('Saving Item');
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