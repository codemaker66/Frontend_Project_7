class Map
{
  init()
	{
    let map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 48.864716, lng: 2.349014},
		  zoom: 10
		})

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(function(position) {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        let marker = new google.maps.Marker({
	  		  position: pos,
	  		  map: map
		    })

        map.setCenter(pos)

      }, function() {
            handleLocationError(true)
        })

    } 
    else 
    {
      // Browser doesn't support Geolocation
      handleLocationError(false)
    }
	}
}

function initMap() {

	let start = new Map

	start.init()
}

function handleLocationError(browserHasGeolocation) {

browserHasGeolocation ? alert(`Error: The Geolocation service failed`) :
                        alert(`Error: Your browser doesn't support geolocation`)
        
}

