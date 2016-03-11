'use strict'
angular.module('app.items.directives', [])
.directive('itemComments', ['Api', function(Api){
  return {
    restrict: 'AEC',
    scope: {
      itemInstance: '='
    },
    replace: true,
    link: function(scope, elem, attrs) {
      scope.saveComment = function() {
        var newComment = new Api.Comment();
        newComment.item = scope.itemInstance._id;
        newComment.content = scope.comment.content;
        newComment.author = scope.comment.author;
        newComment.$save(function(err) {
          if(err) console.log(err);
          scope.comment.datePublished = new Date();
          scope.itemInstance.comments.unshift(scope.comment);
          scope.comment = {};
          scope.commentForm.$setPristine();
        });
      }
    },
    templateUrl: 'modules/items/views/comments.html'
  }
}]);
