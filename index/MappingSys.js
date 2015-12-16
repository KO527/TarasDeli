 // var Promise = require('promise');

 var AreasOfInterest =[{lat: 40.732755, lng: -74.270386}, {lat: 40.730535, lng: -74.276163}];
 var markers = [];
 var windows = [];
 var Contents = ['Tara\'s Deli' + '<br>' + '530 Valley Street' + '<br>' + 'Maplewood, NJ', '6 min. walk' + '<br>' + 'Maplewood Train Station', ];
 var i;


 function init(){

	
	var venueMap = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(AreasOfInterest[0]),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 8
	});

	
	function newWindow(ContentString){
		windows.push(new google.maps.InfoWindow({
			content: ContentString,
			disableAutoPan: true
		}));
	}

	function addMarker(position){
		markers.push(new google.maps.Marker({
			position: new google.maps.LatLng(position),
			animation: google.maps.Animation.DROP,
			map: venueMap
		}));
	}

	var clearMarkers = function(){
		for(i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
	};
	
	var closeWindows = function(){
		for (var s=0; s < windows.length; s++){
			windows[s].close();
		}
	};
	
	function dropandPan(){

		clearMarkers();
		
		for (i = 0; i < AreasOfInterest.length; i++){
			
			if (i == 1){
				setTimeout(function(){venueMap.panTo(AreasOfInterest[1]);}, 6000); // √
				setTimeout(function(){
					addMarker(AreasOfInterest[1]);
					newWindow(Contents[1]); // √
					windows[1].open(venueMap, markers[1]);}, 7000);
			}
			else {
				addMarker(AreasOfInterest[0]); // √
				newWindow(Contents[0]);
				windows[0].open(venueMap, markers[0]);
			}
		}
	}
	

	/////////////// 
	/////////////// 
	///////////////
	///////////////

	//Model View Controller State Change https://developers.google.com/maps/documentation/javascript/events
	var zoomedIn = false;

	function smoothZoom(map, level, count, mode, cb){
		if (mode === true){
			if (count > level){
				return;
			} else {
				var Zoomset = [];
				var z = google.maps.event.addListener(venueMap, 'zoom_changed', function(event){
					google.maps.event.removeListener(z);
					smoothZoom(map, level, count + 1, true,  cb);
				});
				Zoomset.push(count);
				setTimeout(function(){
					if (Zoomset.some(function(item){return (item == 15);})){
					cb();
					}
					venueMap.setZoom(count);
				}, 800);
			}
		} else {
			if (count < level){
				return;
			} else {
				var v = google.maps.event.addListener(venueMap, 'zoom_changed', function(event){
					google.maps.event.removeListener(v);
					smoothZoom(map, level, count - 1, false);
				});
				setTimeout(function(){venueMap.setZoom(count);}, 80);
				i = 0;
			}
		}
	}
	 
	var runCallback = function(){
				console.log("now running");
				setTimeout(dropandPan(), 2000);
				console.log("done Running");
			};

	function ActivateMap(){
			smoothZoom(venueMap, 16, venueMap.getZoom(), true, runCallback);
	}

	function ZoomControl(){

			var doc = document;

			if (($(doc).scrollTop() > 1240 || $(doc).scrollTop < 1340) && ($(doc).scrollTop() < 1740 || $(doc).scrollTop() > 1840)){
				if (!zoomedIn){
					ActivateMap();
					zoomedIn = true;
				}
			}
			else{
				closeWindows();
				clearMarkers();
				smoothZoom(venueMap, 8, venueMap.getZoom(), false, venueMap.setCenter(AreasOfInterest[0]));
				zoomedIn = false;
			}
	}

	document.addEventListener('scroll', ZoomControl, false);
}
	
	

function loadScript(){
	var doc = document;
	var script = doc.createElement('script');
	script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
	doc.body.appendChild(script);
}

window.onload = loadScript;



