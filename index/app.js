/* jshint -W099: false */
/* jslint indent: false */

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

app.controller('FadeInOut', ['$scope', '$timeout', '$interval', '$sce', function($scope, $timeout, $interval, $sce){

	
	$scope.renderHtml = function(html_code){
		return $sce.trustAsHtml(html_code);
	};

	$scope.mainDivs = [
{
	id: 1,
	image: "/TarasPhotos/EmployeeStoreOpening.jpg",
	time: "At <br/>6:00 AM...",
	Happenstance: "Shop opens up <br/>Chefs prepare"
},
{
	id: 2,
	image: '/TarasPhotos/CrowdedLunchTime.jpg',
	time: "At <br/>11:30 AM...<br/>...12:00 PM <br/>...12:30 PM <br/>...1:00 PM",
	Happenstance: "Students flood Deli <br/>For Lunch"
},
{
	id: 3,
	image: '/TarasPhotos/TarasNoTraffic.jpg',
	time: "At <br/>4:00 PM...",
	Happenstance: "Deli Closes"
}
	];


var array = $scope.mainDivs;
$timeout(function(){
$scope.mainDiv = array[array.length - 1];
}, 100);

var index = 0;

$interval(function(){

if (index > array.length - 1){
index = 0;
}

$scope.mainDiv = array[index];

index++;

}, 7000);


}]);



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

		