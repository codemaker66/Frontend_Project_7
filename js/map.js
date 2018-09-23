class Gmap 
{
	constructor(lat, lng, zoom)
	{
		this.map
		this.latLng = {lat: lat, lng: lng}
		this.zoom = zoom
	}
	init()
	{
		this.map = new google.maps.Map(document.getElementById('map'), {
	  		center: this.latLng,
	  		zoom: this.zoom
		})

    	if (navigator.geolocation) {

      		navigator.geolocation.getCurrentPosition((position) => {
        		let pos = {
          			lat: position.coords.latitude,
          			lng: position.coords.longitude
        		}

        	let userMarker = new google.maps.Marker({
	  			position: pos,
	  		  	map: this.map,
	  		  	icon: "map_icons/residential-places.png"
		    })

        	this.map.setCenter(pos)

      		}, function() {
            	handleLocationError(true)
        	})

    	} 
    	else 
    	{
     		// Browser doesn't support Geolocation
      		handleLocationError(false)
    	}

    	function handleLocationError(browserHasGeolocation) {

      		browserHasGeolocation ? alert(`Error: The Geolocation service failed`) :
                              		alert(`Error: Your browser doesn't support geolocation`)
            
    	}
	}
}

let mapObj = new Gmap(48.864716, 2.349014, 10)

google.maps.event.addDomListener(window, 'load', mapObj.init())