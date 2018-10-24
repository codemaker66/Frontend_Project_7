class Gmap
{
	constructor(lat, lng, zoom)
	{
		this.map
		this.center = {lat: lat, lng: lng}
		this.zoom = zoom
		this.tempMarker
		this.position
		this.drag = 0
	}
	init()
	{
		this.map = new google.maps.Map(document.getElementById('map'), {
	  		center: this.center,
	  		zoom: this.zoom
		})

		let button = document.createElement('button')

		button.classList.add('btn')

		button.classList.add('btn-default')

		button.innerHTML = "<i class='fa fa-question'></i>"

		button.setAttribute('title', "Aide");

		button.setAttribute('data-toggle', 'tooltip');

		button.setAttribute('data-placement', 'right');

		button.id = "open"
		
		mapObj.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(button);

		$(button).tooltip();

		$(button).on('click', function() {
        $('#m').modal('show');
      });

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

			$('#map').off('tap')

			google.maps.event.clearListeners(this.map, 'dragend')

			if ($('#find').is(':visible')) {

				$('#find').hide()			
			}

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

			$("#bc").prop("disabled",true);

		})
	}
	dragEnd()
	{

		google.maps.event.addListener(this.map, 'dragend', function(event){


			mapObj.position = {lat: mapObj.map.getCenter().lat(), lng: mapObj.map.getCenter().lng()}

			if (mapObj.drag === 0) {

				let button = document.createElement('button')

				button.classList.add('btn')

				button.classList.add('btn-default')

				button.innerHTML = "<i class='fa fa-search'></i>"

				button.setAttribute('title', "Rechercher des restauranst dans cette zone");

				button.setAttribute('data-toggle', 'tooltip');

				button.setAttribute('data-placement', 'left');

				button.id = "find"

				button.style.display = "none"
				
				mapObj.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(button);

			}

			mapObj.drag = 1

			$("#find").show()

			$('#find').tooltip({trigger : 'hover'});

			console.log(mapObj.position)

			

		})
	}
	btn()
	{
		$("#map").on("click", '#find', function(e){

			mapObj.drag = 0

			$(e.currentTarget).hide()

			restObj.clear()

			ajaxObj.dataArray.length = 0

			console.log(mapObj.position)

			ajaxObj.sendRequest(mapObj.position)

		})
	}
	mobile()
	{
		$('#map').on('tap', function(e) { 

		    mapObj.click()

		});
	}
}

let mapObj = new Gmap(48.864716, 2.349014, 13)//13

mapObj.init()