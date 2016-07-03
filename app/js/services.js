'use strict'
angular.module('app.services',[])
.factory('Api', ['$resource', 'API_PREFIX', 'API_PROFILE_PREFIX', function($resource, API_PREFIX, API_PROFILE_PREFIX){
  return {
    Item: $resource(API_PREFIX+'/items/:id', { id: '@_id' }, {
      update: { method: 'PUT' }
    }),
    Comment: $resource(API_PREFIX+'/items/:id/comments', { id: '@item' }, {
      save:   { method: 'POST' },
    }),
    Rating: $resource(API_PREFIX+'/items/:id/ratings', { id: '@item' }, {
      save:   { method: 'POST' },
    }),
    ProfileItem: $resource(API_PROFILE_PREFIX+'/items'),
    User: $resource(API_PREFIX+'/users/:id', { id: '@_id' }, {
      update: { method: 'PUT' }
    })
  }
}]);
angular.module('app.services').value('API_PREFIX','http://localhost:3000/api');
angular.module('app.services').value('API_PROFILE_PREFIX','http://localhost:3000/api/items/profile');
angular.module('app.services')
.service('popupService', ['$window', function($window) {
  this.showPopup = function(message) {
    return $window.confirm(message);
  }
}]);
angular.module('app.services').factory('authService', ['$auth', '$http', 'AUTH_PREFIX', function($auth, $http, AUTH_PREFIX) {
  return {
    login: function(email, password) {
      var user = {};
      user.email = email;
      try {
        user.password = CryptoJS.SHA256(password).toString();
      }
      catch(err) {
        console.log(err);
        user.password = undefined;
      }
      return $auth.login(user, {
        method: 'POST',
        url: AUTH_PREFIX+'/login'
      });
    },
    logout: function() {
      return $auth.logout();
    },
    profile: function() {
      //return $http.get(AUTH_PREFIX+'/profile');
      console.log($auth.getPayload());
      return $auth.getPayload();
    },
    isAuthenticated: function() {
      return $auth.isAuthenticated();
    },
    isStaff: function() {
      return $auth.getPayload().isStaff || false;
    },
    setStorageType: function(StorageType) {
      return $auth.setStorageType(StorageType);
    },
    signup: function(user) {
      try {
        user.password = CryptoJS.SHA256(user.password).toString();
      }
      catch(err) {
        console.log(err);
        user.password = undefined;
      }
      return $auth.signup(user, {
        method: 'POST',
        url: AUTH_PREFIX+'/signup'
      });
    }
  }
}]);
angular.module('app.services').value('AUTH_PREFIX','http://127.0.0.1:3000/auth');
