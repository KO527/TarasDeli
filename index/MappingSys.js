

var ContentString = 'Tara&#39s Deli\n' + '530 Valley Street';

function init(){
	var mapOptions = {
		center: new google.maps.LatLng(40.732755, -74.270386),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		draggable: false,
		scrollwheel: false,
		zoom: 13
	};

	var venueMap = new google.maps.Map(document.getElementById('map'), mapOptions);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(40.732755, -74.270386),
		animation: google.maps.Animation.DROP,
		map: venueMap
	});
	var infowindow = new google.maps.InfoWindow({
		content: ContentString,
		disableAutoPan: true
	});
	function toggleBounce(){
		if (marker.getAnimation() !== null){
			marker.setAnimation(null);
		}
		else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

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
		if (($(document).scrollTop() > 1240 || $(document).scrollTop < 1340) && ($(document).scrollTop() < 1740 || $(document).scrollTop() > 1840)){
			if (!zoomedIn){
				smoothZoom(venueMap, 17, venueMap.getZoom(), true);
				zoomedIn = true;
			}
			infowindow.open(venueMap, marker);
		}
		else {
			infowindow.close();
			smoothZoom(venueMap, 8, venueMap.getZoom(), false);
			zoomedIn = false;
		}
	}

	document.addEventListener('scroll', ZoomControl, false);
}


function loadScript(){
	var script = document.createElement('script');
	script.src = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=init';
	document.body.appendChild(script);
}


window.onload = loadScript;



