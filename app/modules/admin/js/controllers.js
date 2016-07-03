'use strict'
angular.module('app.admin.controllers',['ui.tinymce'])
.controller('AdminMainController', [function() {
	console.log('AdminMainController');
}])
.controller('AdminNewItemController',['$scope', '$state', 'Api', function($scope, $state, Api){
  $scope.tinymceOptions = {
    // General options
    selector: "textareas",
    theme: "modern",
    // Theme options
    menubar: false,
    toolbar: "undo redo | cut copy paste | bold italic underline | bullist numlist | alignleft aligncenter alignright alignjustify",
    statusbar: false
  }
  $scope.Form = {};
  $scope.item = new Api.Item();
  $scope.item.images = [];
  $scope.buttonText = "Create";
  $scope.saveItem = function() {
    console.log($scope.item);
    //convert price to int to meet Database schema
    $scope.item.price = Math.round($scope.item.price * 100);
    $scope.item.author = $scope.userProfile;
    $scope.item.validFrom = $scope.item.validFrom ? new Date($scope.item.validFrom) : undefined;
    $scope.item.validTo = $scope.item.validTo ? new Date($scope.item.validTo) : undefined;
    $scope.buttonText = "Saving...";
    $scope.item.$save(function(response){
      if(response.status == 'ERR') {
        alert('There was an error when save Item');
      } 
      $state.go('admin.AllItemsView');
    });
  }
}])
.controller('AdminEditItemController', ['$scope', 'Api', '$stateParams', '$state', function($scope, Api, $stateParams, $state) {
  $scope.tinymceOptions = {
    // General options
    selector: "textareas",
    theme: "modern",
    // Theme options
    menubar: false,
    toolbar: "undo redo | cut copy paste | bold italic underline | bullist numlist | alignleft aligncenter alignright alignjustify",
    statusbar: false
  }
  Api.Item.get({id:$stateParams.id}, function(response) {
    $scope.item = response;
    $scope.item.rates = undefined;
    $scope.item.comments = undefined;
    $scope.item.validFrom = $scope.item.validFrom ? new Date($scope.item.validFrom) : undefined;
    $scope.item.validTo = $scope.item.validTo ? new Date($scope.item.validTo) : undefined;
    $scope.item.price = Math.round($scope.item.price / 100, 2);
    $scope.saveItem = function() {
      $scope.item.validFrom = $scope.item.validFrom ? new Date($scope.item.validFrom) : undefined;
      $scope.item.validTo = $scope.item.validTo ? new Date($scope.item.validTo) : undefined;
      $scope.item.price = Math.round($scope.item.price * 100);
      if($scope.item.author == undefined) $scope.item.author = $scope.userProfile; 
      $scope.buttonText = "Updating...";
      $scope.item.$update(function(response) {
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
    $scope.errorMessage = {};
    $scope.successMessage = {};
    if(popupService.showPopup('Really delete this item #'+item._id+'\nTitle: "'+item.title+'"?')) {
      var savedItem = Api.Item.get({id:item._id}, function(response) {
        savedItem.$delete(function(response) {
          $state.go('admin.AllItemsView',undefined,{
            reload: true
          });
        });
      }, function(err) {
        $scope.errorMessage = 'Item delete error: ' + err.data.error.status + ' ' + err.data.message;
      });
    }
  }
}]);