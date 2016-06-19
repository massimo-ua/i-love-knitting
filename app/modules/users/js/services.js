'use strict'
angular.module('app.users.services',[])
.factory('userManagement', ['Api', 'popupService', function(Api, popupService){
	return {
		setApprove: function(user, callback) {
			user.approved = user.approved ? false : true;
			user.$update(function(response){
				callback(null, response);
			}, function(err){
				callback(err, null);
			});
		},
		setStaff: function(user, callback) {
			var action = user.isStaff ? 'revoke' : 'grant';
			user.isStaff = user.isStaff ? false : true;
			if(popupService.showPopup('Do You really want '+action+' Administrative Rights for account #'+user._id+'\n'+user.displayName+'\n'+user.email+'?')) {
				user.$update(function(response){
					callback(null, response);
				}, function(err){
					callback(err, null);
				});
			}
		},
	}

}]);