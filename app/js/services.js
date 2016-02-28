'use strict'
angular.module('app.services',[])
.factory('Api', ['$resource', 'API_PREFIX', function($resource, API_PREFIX){
  return {
    Item: $resource(API_PREFIX+'/items/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    })
  }
}]);
angular.module('app.services').value('API_PREFIX','http://localhost:3000/api');
