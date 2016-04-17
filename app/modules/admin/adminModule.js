'use strict'
angular.module('app.admin',['app.admin.controllers'])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
  .state('admin', {
    url: '/admin',
    abstract: true,
    controller: 'AdminMainController',
    templateUrl: '/modules/admin/views/admin-home.html'
  })
  .state('admin.newItem', {
    url: '/items/new',
    controller: 'AdminNewItemController',
    templateUrl: '/modules/admin/views/new-item.html'
  })
  .state('admin.editItem', {
    url: '/items/:id/edit',
    controller: 'AdminEditItemController',
    templateUrl: '/modules/admin/views/edit-item.html'
  })
  .state('admin.AllItemsView', {
    url: '',
    controller: 'AdminItemsListController',
    templateUrl: '/modules/admin/views/all-items-list.html'
  });

}]);
