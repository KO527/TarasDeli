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
	time: "At <br/>4:00 AM...",
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
