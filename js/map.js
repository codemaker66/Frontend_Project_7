let markers = []

let array = []

class gMap
{
  init()
	{
    this.map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 48.864716, lng: 2.349014},
		  zoom: 10
		})

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        let marker = new google.maps.Marker({
	  		  position: pos,
	  		  map: this.map
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

  restMarkers(data)
  {
    let marker = new google.maps.Marker({
        position: {lat: data.lat, lng: data.long},
        map: this.map
    })

    markers.push(marker)

    let dat = []

    dat.push(data.restaurantName, data.address, data.ratings)

    array.push(dat)
  }
}

let start = new gMap

google.maps.event.addDomListener(window, 'load', start.init())

google.maps.event.addListener(start.map, 'idle', (e) => {

  let div = document.getElementById('main')

  div.innerHTML = ""

  for (let i = 0; i < markers.length; i++){

    if(start.map.getBounds().contains(markers[i].getPosition()) ){

       let bloc = document.createElement("div")

      bloc.id = "bloc"

      let p1 = document.createElement("p")
      p1.textContent = array[i][0]

      let p2 = document.createElement("p")
      p2.textContent = array[i][1]


      bloc.appendChild(p1)
      bloc.appendChild(p2)
      div.appendChild(bloc)
        
    }

  }
        
})




