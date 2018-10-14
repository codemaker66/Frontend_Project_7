class Gmap
{
	constructor(lat, lng, zoom)
	{
		this.map
		this.center = {lat: lat, lng: lng}
		this.zoom = zoom
		this.tempMarker
		this.position
	}
	init()
	{
		this.map = new google.maps.Map(document.getElementById('map'), {
	  		center: this.center,
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
	  				animation: google.maps.Animation.DROP,
	  		  		map: this.map,
	  		  		icon: "map_icons/residential-places.png"
		    	})

        		this.map.setCenter(pos)

        		ajaxObj.sendRequest(pos)

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
	idle()
	{
		google.maps.event.addListener(this.map, 'idle', domObj.showList)	
	}
	click()
	{
		google.maps.event.addListener(this.map, 'click', (event) => {

			google.maps.event.clearListeners(this.map, 'idle')

			google.maps.event.clearListeners(this.map, 'click')

			google.maps.event.clearListeners(this.map, 'dragend')

			for (let i = 0; i < restObj.markers.length; i++) {

				google.maps.event.clearListeners(restObj.markers[i], "click")
			
			}

			this.tempMarker = new google.maps.Marker({
        		position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
        		map: this.map,
        		animation: google.maps.Animation.DROP,
        		icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    		})

			this.map.setCenter(this.tempMarker.position)

			domObj.createRestaurant()

		})
	}
	dragEnd()
	{
		google.maps.event.addListener(this.map, 'dragend', function(event){

			mapObj.position = {lat: mapObj.map.getCenter().lat(), lng: mapObj.map.getCenter().lng()}

			$("#find").show()

			console.log(mapObj.position)

		})
	}
	btn()
	{
		$("#find").on("click", function(e){

			$(e.currentTarget).hide()

			restObj.clear()

			ajaxObj.dataArray.length = 0

			console.log(mapObj.position)

			ajaxObj.sendRequest(mapObj.position)

		})
	}
}

let mapObj = new Gmap(48.864716, 2.349014, 15)//13

mapObj.init()