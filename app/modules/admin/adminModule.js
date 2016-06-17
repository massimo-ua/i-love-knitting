'use strict'
angular.module('app.admin',['app.admin.controllers','app.admin.directives'])
.config(['$stateProvider', function($stateProvider) {
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
    templateUrl: '/modules/admin/views/new-item.html',
    data: {requiredLogin: true}
  })
  .state('admin.editItem', {
    url: '/items/:id/edit',
    controller: 'AdminEditItemController',
    templateUrl: '/modules/admin/views/edit-item.html',
    data: {requiredLogin: true}
  })
  .state('admin.AllItemsView', {
    url: '',
    controller: 'AdminItemsListController',
    templateUrl: '/modules/admin/views/all-items-list.html',
    data: {requiredLogin: true}
  });

}]);
