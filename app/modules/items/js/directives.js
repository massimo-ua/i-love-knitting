'use strict'
angular.module('app.items.directives', [])
.directive('itemComments', [function(){
  return {
    restrict: 'AEC',
    scope: {
      itemInstance: '='
    },
    replace: true,
    link: function(scope, elem, attrs) {
      scope.saveComment = function() {
        var savedItemInstance = angular.copy(scope.itemInstance);
        scope.comment.datePublished = new Date();
        savedItemInstance.comments.unshift(scope.comment);
        scope.itemInstance.comments.unshift(scope.comment);
        scope.comment = {};
        scope.commentForm.$setPristine();
        savedItemInstance.$update();
      }
    },
    templateUrl: 'modules/items/views/comments.html'
  }
}]);
