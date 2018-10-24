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
	    	icon: 'map_icons/restaurant.png',
	    	zIndex: null,
	    	map: mapObj.map
	    	})

		}

	    this.markers.push(this.marker)

	    google.maps.event.addListener(this.markers[num], "click", (e) => {
  
        	for (let i = 0; i < this.markers.length; i++) {

        		if (data[i].custom !== true) {
        			this.markers[i].setIcon('map_icons/restaurant.png')
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

    		$('#main').scrollTop(0);

    		$("#main").off("mouseover")

    	})
	}
	backToList()
	{
		$("#main").on("click", ".return", (e) => { 

			let num = e.currentTarget.id

			if (ajaxObj.dataArray[num].custom === true) {
        			this.markers[num].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
        			this.markers[num].zIndex = null
        		}
        		else
        		{
        			this.markers[num].setIcon('map_icons/restaurant.png')
        			this.markers[num].zIndex = null
        		}

        	if (ajaxObj.filter === true) {

        		domObj.showList()

        		mapObj.idle()

			$('#main').scrollTop(0);

			$(e.currentTarget).hide()

			$('#bc').attr('disabled', false)

			restObj.onHover()

        	}
        	else
        	{

        	mapObj.idle()

			mapObj.click()

			domObj.showList()

			$(e.currentTarget).hide()

			$('#bc').attr('disabled', false)

			restObj.onHover()

        	}

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

    		$('#main').scrollTop(0);
    		$("#main").off("mouseover")
   
		})
	}
	filter()
	{
		$("#bc").on("click", (e) => { 

			let s1 = $("#select1").val()

			let s2 = $("#select2").val()

			console.log(s1 + " " + s2)

			if (s1 > s2 || s1 === s2) {

				alert('error')
			}
			else
			{

				google.maps.event.clearListeners(mapObj.map, 'click')

				google.maps.event.clearListeners(mapObj.map, 'dragend')

				if ($('#find').is(':visible')) {

					$('#find').hide()			
				}

				$('#map').off('tap')

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

			if ($("#main").off("mouseover")) {

  				restObj.onHover()
  			
  			}

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

			$('#bc').attr('disabled', false)

			$('#main').scrollTop(0);

			if ($("#main").off("mouseover")) {

				restObj.onHover()
			}

		})

	}
	sendData()
	{
		$("#main").on("click", "#send", (e) => {

			if ($('#input1').val() === "" || $('#input2').val() === "" || $('#textarea').val() === "" || $('#user').val() === "") {

				alert('one of the feilds are empty')
			}
			else
			{

			let input1 = $('#input1').val()

			let input2 = $('#input2').val()

			let user = $('#user').val()

			let select = Number($('#select').val())

			let textarea = $('#textarea').val()

			domObj.put(input1, input2, select, user, textarea)

			$('#main').scrollTop(0);

			$('#bc').attr('disabled', false)


			}

		})
	}
	comment()
	{
		$("#main").on("click", ".coInfo", (e) => {

			if ($("#comment").val() === "" || $("#userName").val() === "") {

				alert('write a comment please')
			}
			else
			{
				let comment = $("#comment").val()

				let userName = $("#userName").val()

				let star = Number($("#rate").val())

				console.log(star)

				let name = $('#main h3').text()

				domObj.save(comment, star, name, userName)

				$('#main').scrollTop(0);

			}

		})
	}
	onHover()
	{
		$("#main").on("mouseover", ".bloc", (e) => {

    		let num = e.currentTarget.id

    		this.markers[num].zIndex = 9999

    		this.markers[num].setIcon()
   
		})
	}
	onLeave()
	{

		$("#main").on("mouseout", ".bloc", (e) => {

    		let num = e.currentTarget.id

    		if (ajaxObj.dataArray[num].custom !== true) {
        			this.markers[num].setIcon('map_icons/restaurant.png')
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