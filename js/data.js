class Data
{
	constructor()
	{
		this.placesData = []
		this.tempData = []
		this.dat = []
		this.filter = false
		this.val1 = null
		this.val2 = null
	}
	//This method make a places nearby search request
	sendRequest(pos)
	{
		let request = {
		    location: pos,
		    radius: "5000",
		    type: ["restaurant"]
	  	}
	  	let service = new google.maps.places.PlacesService(mapObj.map)
  		service.nearbySearch(request, (results, status) => {
		  	if (status == google.maps.places.PlacesServiceStatus.OK) {
		  		this.placesData = results
		    	this.getResponse()
		  	}
		  	else
		  	{
		  		google.maps.event.clearListeners(mapObj.map, "idle")
		        google.maps.event.clearListeners(mapObj.map, "click")
				$("#filter").attr("disabled", true)
		  		let main = document.getElementById("main")
		  		main.innerHTML = ""
		  		let bloc = document.createElement("div")
        		bloc.classList.add("bloc")
        		let h4 = document.createElement("h4")
        		h4.textContent = "Erreur lors de la recherche !!"
        		let p = document.createElement("p")
        		p.textContent = "Aucun restaurant n'a été trouvé à cet endroit."
        		p.style.color = "#737373"
		        bloc.appendChild(h4)
		        bloc.appendChild(p)
		        main.appendChild(bloc)
			}
		})
	}
	//This method make a places details request
	getDetails(num)
	{
		this.wichData()
		if (this.dat[num].custom !== true) {
			let request = {
				placeId: this.dat[num].place_id,
				fields: ["name", "vicinity", "rating", "review"]
			}
			let service = new google.maps.places.PlacesService(mapObj.map)
			service.getDetails(request, (place, status) => {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			  	domObj.showDetails(place, num) 
			  }
			})
		}
		else
		{
			domObj.showDetails(this.dat[num], num)
		}
	}
	//This method initialize the creation of the restaurants list and their markers then check if the app needed events are active or not
	getResponse()
	{
		this.wichData()
		for (let count = 0; count < this.dat.length; count++) {
			restObj.initMarkers(count)
		}
		domObj.showList()
		if (initObj.firstLaunch === true) {
			initObj.initEvents()
			initObj.firstLaunch = false
		}
		else
		{
			initObj.checkEvents()
		}
	}
	//This method filter the restaurants and put them in the array tempData
	filterData(val1, val2)
	{
		if (val1 === undefined && val2 === undefined) {
			val1 = this.val1
			val2 = this.val2
		}
		else
		{
			this.val1 = val1
			this.val2 = val2
		}
		if (this.tempData.length > 0) {
			this.tempData.length = 0
		}
		for (let i = 0; i < this.placesData.length; i++) {
        	if (this.placesData[i].rating >= val1 && this.placesData[i].rating <= val2) {
        		this.tempData.push(this.placesData[i])
        	}
      	}
      	if (!Array.isArray(this.tempData) || !this.tempData.length) {
	  		google.maps.event.clearListeners(mapObj.map, "idle")
	  		let main = document.getElementById("main")
	  		main.innerHTML = ""
	  		let bloc = document.createElement("div")
    		bloc.classList.add("bloc")
    		let h4 = document.createElement("h4")
    		h4.textContent = "Erreur de filtre !!"
    		let p = document.createElement("p")
    		p.textContent = "Aucun restaurant n'a été trouvé pour le filtre que vous avez choisi."
    		p.style.color = "#737373"
	        bloc.appendChild(h4)
	        bloc.appendChild(p)
	        main.appendChild(bloc)
      	}
      	else
      	{
      		this.getResponse()
      	}
	}
	//This method test if the filter options are enabled or not to load the correct array of data
	wichData()
	{
		if (this.filter !== true) {
			this.dat = this.placesData
		}
		else
		{
			this.dat = this.tempData
		}
	}
	//This method add the custom restaurant details into the placesData array
	addRestaurant(restaurantName, address, userName, rate, comment)
	{
		this.placesData.push({
        	name: restaurantName,
        	vicinity: address,
        	geometry: {location: mapObj.tempMarker.position},
        	custom: true
    	})
    	mapObj.tempMarker.setMap(null)
    	this.addReview(restaurantName, userName, rate, comment)
	}
	//This method add the user review of a restaurant in the placesData array
	addReview(restaurantName, userName, rate, comment)
	{
		for (var i = 0; i < this.placesData.length; i++) {
      		if (this.placesData[i].name === restaurantName) {
	            if (this.placesData[i].userName === undefined) {
	            	this.placesData[i].userName = [userName]
	            }
	            else
	            {
	              	this.placesData[i].userName.push(userName)
	            }	
	            if (this.placesData[i].userRating === undefined) {
	              	this.placesData[i].userRating = [rate]
	            }
	            else
	            {
	              	this.placesData[i].userRating.push(rate)
	            }
		        if (this.placesData[i].comment === undefined) {
		          	this.placesData[i].comment = [comment]
		        }
		        else
		        {
		          	this.placesData[i].comment.push(comment)
		        }
	            if (this.placesData[i].rating === undefined) {
	                this.placesData[i].rating = rate
	            }
	            else
	            {
	                let total = this.placesData[i].rating + rate
	                this.placesData[i].rating = total/2
	            }
		    	break;
      		}
    	}
    	restObj.clearMarkers()
    	if (this.filter !== true) {
    		this.getResponse()
    	}
    	else
    	{
      		this.filterData()
    	}
	}
}
let dataObj = new Data