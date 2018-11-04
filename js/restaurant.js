class Restaurant
{
	constructor()
	{
		this.markers = []
	}
	//This method create and display the markers on the map and give each one of them the click event
	initMarkers(num)
	{
		let marker
    	if (dataObj.dat[num].custom === true) {
			marker = new google.maps.Marker({
	    		position: {lat: dataObj.dat[num].geometry.location.lat(), lng: dataObj.dat[num].geometry.location.lng()},
	    		icon: "icons/custom_restaurant.png",
	    		zIndex: null,
	    		map: mapObj.map
	    	})
		}
		else
		{
			marker = new google.maps.Marker({
	    		position: {lat: dataObj.dat[num].geometry.location.lat(), lng: dataObj.dat[num].geometry.location.lng()},
	    		icon: "icons/restaurant.png",
	    		zIndex: null,
	    		map: mapObj.map
	    	})
		}
	    this.markers.push(marker)
	    google.maps.event.addListener(this.markers[num], "click", (e) => {
	    	for (let i = 0; i < this.markers.length; i++) {
        		if (dataObj.dat[i].custom !== true) {
        			this.markers[i].setIcon("icons/restaurant.png")
        			this.markers[i].zIndex = null
        		}
        		else
        		{
        			this.markers[i].setIcon("icons/custom_restaurant.png")
        			this.markers[i].zIndex = null
        		}  	
            } 
            $("#main").scrollTop(0)
    		$("#main").off("mouseover")
    		dataObj.getDetails(num)
    	})
	}
	//This method make the user go back to the list of the restaurants
	backToList()
	{
		$("#main").on("click", ".return", (e) => { 
			let num = e.currentTarget.id
			if (dataObj.dat[num].custom === true) {
        		this.markers[num].setIcon("icons/custom_restaurant.png")
        		this.markers[num].zIndex = null
    		}
    		else
    		{
    			this.markers[num].setIcon("icons/restaurant.png")
    			this.markers[num].zIndex = null
    		}
        	domObj.showList()
        	initObj.checkEvents()
		})
	}
	//This method enable the click event on each restaurant item in the list
	itemClick()
	{
		$("#main").on("click", ".item", (e) => {
    		let num = e.currentTarget.id
    		$("#main").scrollTop(0)
    		$("#main").off("mouseover")
    		dataObj.getDetails(num)
		})
	}
	//This method check if the options chosen by the user are correct to activate or not the filter on the map
	filter()
	{
		$("#filter").on("click", (e) => { 
			let select1 = Number($("#select1").val())
			let select2 = Number($("#select2").val())
			if (select1 > select2 || select1 === select2) {
				alert("Vos options de filtrage ne sont pas valides")
			}
			else
			{
				google.maps.event.clearListeners(mapObj.map, "click")
				google.maps.event.clearListeners(mapObj.map, "dragend")
				if ($("#searchBtn").is(":visible")) {
					$("#searchBtn").fadeOut(500)			
				}
				$("#default").fadeIn(500)
				this.clearMarkers()
				dataObj.filter = true
				dataObj.filterData(select1, select2)
			}
		})
	}
	//This method stop the filter options and show all the restaurants on the map
	default()
	{
		$("#default").on("click", (e) => {
			$(e.currentTarget).fadeOut(500)
			dataObj.tempData.length = 0
			this.clearMarkers()
			dataObj.filter = false
			$("#main").scrollTop(0)
			dataObj.getResponse()
		})
	}
	//This method clear all the markers from the map and the markers array
	clearMarkers()
	{
		for (var i = 0; i < this.markers.length; i++ ) {
	    	this.markers[i].setMap(null)
	  	}
	  	this.markers.length = 0
	}
	//This method cancel the creation of a custom restaurant
	cancel()
	{
		$("#main").on("click", "#cancel", (e) => {
			mapObj.tempMarker.setMap(null)
			$("#main").scrollTop(0)
			this.clearMarkers()
			dataObj.getResponse()
		})
	}
	//This method check if there are no empty fields then retrieve the written data to proceed to the creation of the custom restaurant
	create()
	{
		$("#main").on("click", "#create", (e) => {
			if ($("#restaurantName").val() === "" || $("#address").val() === "" || $("#userName").val() === "" || $("#comment").val() === "") {
				alert("Vous devez remplir tous les champs vides")
			}
			else
			{
				let restaurantName = $("#restaurantName").val()
				let address = $("#address").val()
				let userName = $("#userName").val()
				let rate = Number($("#rate").val())
				let comment = $("#comment").val()
				$("#main").scrollTop(0)
				dataObj.addRestaurant(restaurantName, address, userName, rate, comment)
			}
		})
	}
	//This method check if the user didn't forget to fill up all the fields before adding his review to the current restaurant
	restReview()
	{
		$("#main").on("click", ".review", (e) => {
			if ($("#userName").val() === "" || $("#comment").val() === "") {
				alert("Vous devez remplir tous les champs vides")
			}
			else
			{
				let restaurantName = $("#main h3").text()
				let userName = $("#userName").val()
				let rate = Number($("#rate").val())
				let comment = $("#comment").val()
				$("#main").scrollTop(0)
				dataObj.addReview(restaurantName, userName, rate, comment)
			}
		})
	}
	//This method change the icon of the marker when hovering on it's item in the list
	onHover()
	{
		$("#main").on("mouseover", ".item", (e) => {
    		let num = e.currentTarget.id
    		this.markers[num].zIndex = 9999
    		this.markers[num].setIcon("icons/selected_restaurant.png")
		})
	}
	//This method restore the icon of the marker when the user mouse is out of it's item in the list
	onLeave()
	{
		$("#main").on("mouseout", ".item", (e) => {
    		let num = e.currentTarget.id
    		if (dataObj.dat[num].custom !== true) {
        		this.markers[num].setIcon("icons/restaurant.png")
        		this.markers[num].zIndex = null
    		}
    		else
    		{
    			this.markers[num].setIcon("icons/custom_restaurant.png")
    			this.markers[num].zIndex = null
    		}	
		})
	}
}
let restObj = new Restaurant