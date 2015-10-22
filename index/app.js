(function(){
var app = angular.module('TarasDeli', ['ngRoute', 'ngAnimate']);

 // app.config(function($routeProvider){
 // 	$routeProvider.when('/', {
 // 		controller: 'FadeInOut',
 // 		templateUrl: './Html/index.html'
 // 	}).
 // 	when('/contact', {
 // 		templateUrl: './Html/contact.html'
 // 	});
 // });


app.animation('.repeated-item', ['$timeout', function($timeout){
	
return {
	enter: function(element, done){
		

		var img = angular.element(element.children()[0]);
		var clock = angular.element(element.children()[1]);
		var haps = angular.element(element.children()[2]);

		img.css({
			opacity: 0
		});
		img.animate({
			opacity: 1
		}, 2000, function(){
			$timeout(function(){clock.animate({left: '35px', opacity: 1}, 1000);}, 1000);
			$timeout(function(){haps.animate({left: '35px', opacity: 1}, 1000);}, 1000);
			$timeout(function(){clock.animate({left: '-500px', opacity: 0}, 1000);}, 5000);
			$timeout(function(){haps.animate({left: '-500px', opacity: 0}, 1000);}, 5000);
		}());
	
	},

	leave: function(element, done){

		var img = angular.element(element.children()[0]);
		var clock = angular.element(element.children()[1]);
		var haps = angular.element(element.children()[2]);

		img.css({
			opacity: 1
		});
		img.animate({
			opacity: 0
		}, 1000);
	}
};

}]);

})();

		