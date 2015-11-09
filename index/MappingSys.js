 var AreasOfInterest =[{lat: 40.732755, lng: -74.270386}, {lat:40.730535, lng:-74.276163}];
 var markers = [];
 var windows = [];
 var Contents = ['Tara\'s Deli' + '\n' + '530 Valley Street', 'Maplewood Train Station'];
 var i;
function init(){
		
	var mapOptions = {
		center: new google.maps.LatLng(AreasOfInterest[0]),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 13
	};

	var venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);


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
	// if venueMap.data.contains(markers[0]);
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
		windows = [];
	};

	function dropandPan(){
		clearMarkers();

		for (i = 0; i <= AreasOfInterest.length; i++){
			if (venueMap.data.contains(markers[i])){
				console.log("nextStep");
				venueMap.panTo(AreasOfInterest[i].lat, AreasOfInterest[i].lng); // √
				windows[i].open(venueMap, markers[i]);
				console.log("hey Chode");
				setTimeout(windows[i].close(venueMap, markers[i]), 3000);
			}
			else if (i == 2){
				console.log("Rerun!!");
				setTimeout(closeWindows(), 3000);
				console.log("closed");
			}
			else{
				setTimeout(addMarker(AreasOfInterest[i]), 4000); // √
				newWindow(Contents[i]);
				console.log("made");
				setTimeout(venueMap.panTo(AreasOfInterest[i]), 3500); // √
				console.log("PanOver");
				windows[i].open(venueMap, markers[i]);
				console.log("Newwindow");
			}
		}
	}


	/////////////// 
	/////////////// 
	///////////////
	///////////////

	//Model View Controller State Change https://developers.google.com/maps/documentation/javascript/events
	var zoomedIn = false;

	function smoothZoom(map, level, cnt, mode){
		if (mode === true){
			if (cnt >= level){
				return;
			}
			else {
				var z = google.maps.event.addListener(venueMap, 'zoom_changed', function(event){
					google.maps.event.removeListener(z);
					smoothZoom(map, level, cnt + 1, true);
				});
				setTimeout(function(){venueMap.setZoom(cnt);}, 800);
			}
		}
		else {
			if (cnt <= level){
				return;
			}
			else {
				var v = google.maps.event.addListener(venueMap, 'zoom_changed', function(event){
					google.maps.event.removeListener(v);
					smoothZoom(map, level, cnt - 1, false);
				});
				setTimeout(function(){venueMap.setZoom(cnt);}, 80);
			}
		}
	}
	

	function ZoomControl(){

	
		var doc = document;
		if (($(doc).scrollTop() > 1240 || $(doc).scrollTop < 1340) && ($(doc).scrollTop() < 1740 || $(doc).scrollTop() > 1840)){
			if (!zoomedIn){
				smoothZoom(venueMap, 18, venueMap.getZoom(), true);
				zoomedIn = true;
				dropandPan();
			}
		}
		else{
			closeWindows();
			smoothZoom(venueMap, 8, venueMap.getZoom(), false);
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



