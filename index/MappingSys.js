 var AreasOfInterest =[[ 40.732755, -74.270386], [ 40.730535, -74.276163]];
 var markers = [];
 var i;
function init(){
		
	var mapOptions = {
		center: new google.maps.LatLng(AreasOfInterest[0][0], AreasOfInterest[0][1]),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		zoom: 13
	};

	var venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);


	var ContentString = 'Tara&#39s Deli\n' + '530 Valley Street';

	var infowindow = new google.maps.InfoWindow({
		content: ContentString,
		disableAutoPan: true
	});

	var TrainInfo = 'Maplewood Train Station';

	var Trainwindow = new google.maps.InfoWindow({
		content: TrainInfo,
		disableAutoPan: true
	});

	var windows = [infowindow, Trainwindow];

	function addMarker(position){
			markers.push(new google.maps.Marker({
				position: new google.maps.LatLng(position), //possible error
				animation: google.maps.Animation.DROP,
				map: venueMap
			}));
	}
	// if venueMap.data.contains(markers[0]);
	
	function dropandPan(){
		clearMarkers();
		console.log("hey chode");
		for (i = 0; i < AreasOfInterest.length; i++){
			if (venueMap.data.contains(markers[i])){
				// console.log("hey Chode");
				venueMap.panTo(AreasOfInterest[i][0], AreasOfInterest[i][1]);
				windows[i].open(venueMap, markers[i]);
				setTimeout(windows[i].close(venueMap, markers[i]), 3000);
			}
			else{
				addMarker(AreasOfInterest[i][0], AreasOfInterest[i][1]);
				venueMap.panTo(AreasOfInterest[i][0], AreasOfInterest[i][1]);
				windows[i].open(venueMap, markers[i]);
				console.log("I hate you");
				setTimeout(windows[i].close(venueMap, markers[i]), 3000);
			}
		}
		if (i == 1){
			setTimeout(dropandPan(), 3500);
		}
	}

	var clearMarkers = function(){
		for(i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
	};

	// var marker = new google.maps.Marker({
	// 	position: TarasLatLng,
	// 	animation: google.maps.Animation.DROP,
	// 	map: venueMap
	// });

	// var TrainStationMarker = new google.maps.Marker({
	// 	position: AreasOfInterest[1],
	// 	animation: google.maps.Animation.DROP,
	// 	map: venueMap
	// });
	
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
			infowindow.close();
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



