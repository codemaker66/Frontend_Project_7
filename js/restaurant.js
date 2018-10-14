class Restaurant
{
	constructor()
	{
		this.marker
		this.markers = []
	}
	initMarkers(lat, lng, num)
	{
		let data = []

    if (ajaxObj.filter === true) {

      data = ajaxObj.tempData

    }
    else
    {
      data = ajaxObj.dataArray
    }

		if (data[num].custom === true) {

			this.marker = new google.maps.Marker({
	    	position: {lat: lat, lng: lng},
	    	icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
	    	zIndex: null,
	    	map: mapObj.map
	    	})

		}
		else
		{

			this.marker = new google.maps.Marker({
	    	position: {lat: lat, lng: lng},
	    	zIndex: null,
	    	map: mapObj.map
	    	})

		}

	    this.markers.push(this.marker)

	    google.maps.event.addListener(this.markers[num], "click", (e) => {
  
        	for (let i = 0; i < this.markers.length; i++) {

        		if (data[i].custom !== true) {
        			this.markers[i].setIcon()
        		}
        		else
        		{
        			this.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        		}
                 	
            } 

            if (ajaxObj.filter === true) {

    			ajaxObj.getFilter(num)

    		}
    		else
    		{
    			ajaxObj.getDetails(num)
    		}

    	})
	}
	backToList()
	{
		$("#main").on("click", ".btn", (e) => { 

			let num = e.currentTarget.id

			if (ajaxObj.dataArray[num].custom === true) {
        			this.markers[num].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        			this.markers[num].zIndex = null
        		}
        		else
        		{
        			this.markers[num].setIcon()
        			this.markers[num].zIndex = null
        		}
			
			mapObj.idle()

			mapObj.click()

			domObj.showList()

		})
	}
	itemClick()
	{
		$("#main").on("click", ".bloc", (e) => {

    		let num = e.currentTarget.id

    		if (ajaxObj.filter === true) {

    			ajaxObj.getFilter(num)

    		}
    		else
    		{
    			ajaxObj.getDetails(num)
    		}
   
		})
	}
	filter()
	{
		$("#bc").on("click", (e) => { 

			let s1 = $("#s1").val()

			let s2 = $("#s2").val()

			if (s1 > s2 || s1 === s2) {

				alert('error')
			}
			else
			{

				google.maps.event.clearListeners(mapObj.map, 'click')

				ajaxObj.filter = true

				ajaxObj.filterData(s1, s2)

				$("#def").show()

			}

		})
	}
	default()
	{
		$("#def").on("click", (e) => {

			ajaxObj.tempData.length = 0

			ajaxObj.filter = false

			ajaxObj.getResponse(false)

			$(e.currentTarget).hide()

		})
	}
	clear()
	{
		for (var i = 0; i < this.markers.length; i++ ) {

	    	this.markers[i].setMap(null)
	  	}

	  	this.markers.length = 0

	  	let div = document.getElementById('main')

	    div.innerHTML = ""
	}
	stop()
	{
		$("#main").on("click", "#stop", (e) => {

			let div = document.getElementById('main')

		  	div.innerHTML = ""

		  	mapObj.tempMarker.setMap(null)

			ajaxObj.getResponse(false)

		})

	}
	sendData()
	{
		$("#main").on("click", "#send", (e) => {

			if ($('#input1').val() === "" || $('#input2').val() === "" || $('#textarea').val() === "") {

				alert('one of the feilds are empty')
			}
			else
			{

			let input1 = $('#input1').val()

			let input2 = $('#input2').val()

			let select = Number($('#select').val())

			let textarea = $('#textarea').val()

			domObj.put(input1, input2, select, textarea)

			}

		})
	}
	comment()
	{
		$("#main").on("click", ".coInfo", (e) => {

			if ($("#comment").val() === "") {

				alert('write a comment please')
			}
			else
			{
				let comment = $("#comment").val()

				let star = Number($("#rate").val())

				let name = $('#name').text()

				domObj.save(comment, star, name)

			}

		})
	}
	onHover()
	{
		$("#main").on("mouseover", ".bloc", (e) => {

    		let num = e.currentTarget.id

    		this.markers[num].zIndex = 99

    		this.markers[num].setIcon('map_icons/restaurants.png')
   
		})
	}
	onLeave()
	{

		$("#main").on("mouseout", ".bloc", (e) => {

    		let num = e.currentTarget.id

    		if (ajaxObj.dataArray[num].custom !== true) {
        			this.markers[num].setIcon()
        			this.markers[num].zIndex = null
    		}
    		else
    		{
    			this.markers[num].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
    			this.markers[num].zIndex = null
    		}	
   
		})

	}
}

restObj = new Restaurant()