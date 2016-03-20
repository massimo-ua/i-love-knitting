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
}])
.directive('itemRate', ['Api', function(Api){
  return {
    restrict: 'AEC',
    scope: {
      itemInstance: '='
    },
    replace: true,
    link: function(scope, elem, attrs) {
      scope.Vote = function(i) {
        var newRate = new Api.Rating();
        newRate.item = scope.itemInstance._id;
        newRate.value = parseInt(i);
        newRate.$save(function(response) {
            scope.itemInstance.rates[0].avgRating = response.data[0].avgRating;
        },
      function(err) {
        console.log(err);
      });
      }
    },
    templateUrl: 'modules/items/views/rating.html'
  }
}]);
