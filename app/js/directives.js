'use strict'
angular.module('app.directives',[])
.directive('messageBlock', [function(){
    return {
        restrict: 'AEC',
        scope: false,
        link: {},
        templateUrl: 'views/message-block.html'
    }
}]);