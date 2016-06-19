'use strict'
angular.module('app.admin.controllers',[])
.controller('AdminMainController', [function() {
	console.log('AdminMainController');
}])
.controller('AdminNewItemController',['$scope', '$state', 'Api', function($scope, $state, Api){
	$scope.Form = {};
  $scope.item = new Api.Item();
  $scope.item.images = [];
  $scope.buttonText = "Create";
  $scope.saveItem = function() {
    //convert price to int to meet Database schema
    $scope.item.price = Math.round($scope.item.price * 100);
    $scope.item.author = $scope.userProfile;
    $scope.buttonText = "Saving...";
    $scope.item.$save(function(response){
      if(response.status == 'ERR') {
        alert('There was an error when save Item');
        console.log(response);
      } 
      $state.go('admin.AllItemsView');
    });
  }
}])
.controller('AdminEditItemController', ['$scope', 'Api', '$stateParams', '$state', function($scope, Api, $stateParams, $state) {
  Api.Item.get({id:$stateParams.id}, function(response) {
    $scope.item = response;
    $scope.item.rates = undefined;
    $scope.item.comments = undefined;
    $scope.item.price = Math.round($scope.item.price / 100, 2);
    $scope.saveItem = function() {
      $scope.item.price = Math.round($scope.item.price * 100);
      if($scope.item.author == undefined) $scope.item.author = $scope.userProfile; 
      $scope.buttonText = "Updating...";
      $scope.item.$update(function(response) {
        console.log(response);
        $state.go('admin.AllItemsView');
      });
    }
  });
  
  $scope.buttonText = "Update";
}])
.controller('AdminItemsListController', ['$scope','Api', '$state', 'popupService', function($scope, Api, $state, popupService) {
	Api.ProfileItem.query({}, function(response){
  			$scope.itemsList = response;
  });
  $scope.itemDelete = function(item) {
    if(popupService.showPopup('Really delete this item #'+item._id+'\nTitle: "'+item.title+'"?')) {
      item.$delete(function(response) {
        $state.go('admin.AllItemsView',undefined,{
          reload: true
        });
      });
    }
  }
}]);