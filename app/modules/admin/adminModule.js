'use strict'
angular.module('app.admin',[])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
  .state('admin', {
    url: '/admin',
    abstract: true,
    controller: adminController,
    templateUrl: '/modules/admin/views/admin-home.html'
  })
  .state('admin.newItem', {
    url: '/items/new',
    controller: 'itemNewController',
    templateUrl: '/modules/admin/views/new-item.html'
  });

}]);
