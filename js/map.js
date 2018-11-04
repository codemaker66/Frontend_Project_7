class Gmap
{
	constructor()
	{
		this.map
		this.tempMarker
		this.firstMove = false
		this.position
	}
	//This method display the map and check if the currently used browser support the geolocation api
	init()
	{
		this.map = new google.maps.Map(document.getElementById("map"), {
	  		center: {lat: 48.864716, lng: 2.349014},
	  		zoom: 13
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
	  		  		icon: "icons/home.png"
		    	})
		    	let helpBtn = document.createElement("button")
				$(helpBtn).addClass("btn")
				$(helpBtn).html("<i class='fa fa-question'></i>")
				$(helpBtn).attr({
					id: "helpBtn",
				    title: "Aide",
				    "data-toggle": "tooltip",
				    "data-placement": "right"
				})
				this.map.controls[google.maps.ControlPosition.LEFT_CENTER].push(helpBtn)
        		$(helpBtn).tooltip()
				$(helpBtn).on("click", (e) => $(".modal").modal("show"))
        		this.map.setCenter(pos)
        		dataObj.sendRequest(pos)
      		}, function() {
            	handleLocationError(true)
        	})
    	} 
    	else 
    	{
     		//Browser doesn't support geolocation
      		handleLocationError(false)
    	}
    	function handleLocationError(browserHasGeolocation) {
      		browserHasGeolocation ? alert("Erreur: le service de géolocalisation a échoué") :
            alert("Erreur: votre navigateur ne supporte pas la géolocalisation")    
    	}
	}
	//This method enable the idle event on the map
	idle()
	{
		google.maps.event.addListener(this.map, "idle", domObj.showList)
	}
	//This method enable the click event on the map
	click()
	{
		google.maps.event.addListener(this.map, "click", (event) => {
			google.maps.event.clearListeners(this.map, "idle")
			google.maps.event.clearListeners(this.map, "click")
			google.maps.event.clearListeners(this.map, "dragend")
			for (let i = 0; i < restObj.markers.length; i++) {
				google.maps.event.clearListeners(restObj.markers[i], "click")
			}
			if ($("#searchBtn").is(":visible")) {
				$("#searchBtn").fadeOut(500)
			}
			$("#filter").attr("disabled", true)
			this.tempMarker = new google.maps.Marker({
        		position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
        		map: this.map,
        		animation: google.maps.Animation.DROP,
        		icon: "icons/custom_restaurant.png"
    		})
			this.map.setCenter(this.tempMarker.position)
			domObj.showRestForm()
		})
	}
	//This method enable the dragend event on the map
	dragEnd()
	{
		google.maps.event.addListener(this.map, "dragend", (event) => {
			this.position = {lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()}
			if (this.firstMove === false) {
				let searchBtn = document.createElement("button")
				$(searchBtn).addClass("btn")
				$(searchBtn).html("<i class='fa fa-search'></i>")
				$(searchBtn).attr({
					id: "searchBtn",
				    title: "Rechercher des restaurants dans cette zone",
				    "data-toggle": "tooltip",
				    "data-placement": "left"
				})
				this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(searchBtn)
				$(searchBtn).tooltip({trigger : "hover"})
				this.firstMove = true
			}
			if ($("#searchBtn").is(":hidden")) {
				$("#searchBtn").fadeIn(500)
			}
		})
	}
	//This method enable the click event on the button whose id is searchBtn
	search()
	{
		$("#map").on("click", "#searchBtn", (e) => {
			$(e.currentTarget).fadeOut(500)
			restObj.clearMarkers()
			dataObj.placesData.length = 0
			$("#main").scrollTop(0)
			dataObj.sendRequest(this.position)
		})
	}
}
let mapObj = new Gmap