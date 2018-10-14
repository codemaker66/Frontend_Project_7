class Ajax
{
	constructor()
	{
		this.dataArray = []
		this.tempData = []
		this.filter = false
		this.val1 = null
		this.val2 = null
		this.test = false
	}
	sendRequest(pos)
	{
		let request = {
		    location: pos,
		    radius: '1000',
		    type: ['restaurant']
	  	}

	  	let service = new google.maps.places.PlacesService(mapObj.map)
  		service.nearbySearch(request, callback)

  		function callback(results, status) {
		  	if (status == google.maps.places.PlacesServiceStatus.OK) {

		  		ajaxObj.dataArray = results

		  		console.log(ajaxObj.dataArray)

		    	ajaxObj.getResponse()
		  	}
		  	else
		  	{
		  		alert('pas de resto dans cette région')
		  	}
		}
	}
	getDetails(num)
	{
		if (ajaxObj.dataArray[num].custom !== true) {

			let request = {
			placeId: this.dataArray[num].place_id,
			fields: ['name', 'vicinity', 'rating', 'review']
			}

			let service = new google.maps.places.PlacesService(mapObj.map)
			service.getDetails(request, callback)

			function callback(place, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {

			  	domObj.showInfo(place, num)
			    
			  }
			}

		}
		else
		{
			domObj.showInfo(ajaxObj.dataArray[num], num)
		}

	}
	getFilter(num)
	{
		if (ajaxObj.tempData[num].custom !== true) {

			let request = {
			placeId: this.tempData[num].place_id,
			fields: ['name', 'vicinity', 'rating', 'review']
			}

			let service = new google.maps.places.PlacesService(mapObj.map)
			service.getDetails(request, callback)

			function callback(place, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {

			  	domObj.showInfo(place, num)
			    
			  }
			}

		}
		else
		{
			domObj.showInfo(ajaxObj.tempData[num], num)
		}
	}
	getResponse(origin = true)
	{
		if (origin !== false) {

			let count = 0

			this.dataArray.forEach((data) => {

				restObj.initMarkers(data.geometry.location.lat(), data.geometry.location.lng(), count)

				count++

			})

			if (this.test === false) {

				domObj.showList()

			mapObj.idle()

			mapObj.click()

			restObj.backToList()

			restObj.itemClick()

			restObj.filter()

			restObj.default()

			restObj.stop()

			restObj.sendData()

			restObj.comment()

			mapObj.dragEnd()

			mapObj.btn()

			restObj.onHover()

			restObj.onLeave()

			this.test = true


			}
			else
			{

				domObj.showList()

			}

		
		}
		else
		{
			restObj.clear()

			let count = 0

			this.dataArray.forEach((data) => {

				restObj.initMarkers(data.geometry.location.lat(), data.geometry.location.lng(), count)

				count++

			})

			if (google.maps.event.hasListeners(mapObj.map,'click') === false) {

    			mapObj.click()

  			}

  			if (google.maps.event.hasListeners(mapObj.map,'idle') === false) {

    			mapObj.idle()

  			}

  			if (google.maps.event.hasListeners(mapObj.map,'dragend') === false) {

    			mapObj.dragEnd()

  			}

			domObj.showList()

		}
	}
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

		restObj.clear()

		this.tempData.length = 0

		let test = 0

      	for (let j = 0; j < this.dataArray.length; j++) {

        	if (this.dataArray[j].rating >= val1 && this.dataArray[j].rating <= val2) {

        		this.tempData.push(this.dataArray[j])

        	}
        
      	}

      	if (!Array.isArray(this.tempData) || !this.tempData.length) {

      		alert('aucun resto')

      	}

      	//console.log(this.tempData)

		let count = 0

		this.tempData.forEach((data) => {

		    restObj.initMarkers(data.geometry.location.lat(), data.geometry.location.lng(), count)

			count++

		})

		domObj.showList()

	}
}

let ajaxObj = new Ajax()