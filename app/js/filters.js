'use strict'
angular.module('app.filters',[])
.filter('range', function(){
  return function(input, total) {
    total = parseInt(total);
    for(var i=1; i<=total; i++) {
      input.push(i);
    }
    return input;
  }
})
.filter('strTruncate', function() {
	return function(input, wordwise, max, tail){
		if(input == undefined) return '';
		try {
			var max = parseInt(max, 10);
		}
		catch(err) {
			console.log(err);
			return input;
		}
		if(input.length <= max) return input;
			input = input.substr(0,max);
		if(wordwise) {
			var lastspace = input.lastIndexOf(' ');
			if(lastspace != -1) {
				if(input.charAt(lastspace-1) == '.' || input.charAt(lastspace-1) == ',') {
					lastspace = lastspace-1;
				}
			input = input.substr(0,lastspace);
		}
	}
	return input + (tail || '...');
	}
});
