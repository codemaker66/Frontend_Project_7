class Events
{
	mapIdle()
	{
		google.maps.event.addListener(mapObj.map, 'idle', dataObj.showList)
	}
	markerClick(count)
	{
		google.maps.event.addListener(dataObj.markers[count], "click", (e) => {
  
                for (let i = 0; i < dataObj.markers.length; i++) {

                	if (dataObj.markers[i].custom === true) {

                		dataObj.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
                	}
                	else
                	{
                		dataObj.markers[i].setIcon()
                	}
                 	
                } 

                mapObj.map.setCenter(dataObj.markers[count].position)

                dataObj.showInfo(count)

    	})
	}
	itemClick()
	{
		$("#main").on("click", ".bloc", function () {

    		let num = $(this).attr("id")

    		mapObj.map.setCenter(dataObj.markers[num].position)

    		dataObj.showInfo(num)
   
		})
	}
	backToList()
	{
		$("#main").on("click", ".btn", function () { 

			let num = $(this).attr("id")

			if (dataObj.markers[num].custom === true) {

				dataObj.markers[num].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

			}
			else
			{
				dataObj.markers[num].setIcon()
			}

			dataObj.showList()

		})
	}
	filter()
	{
		$("#bc").on("click", function() { 

			let s1 = $("#s1").val()

			let s2 = $("#s2").val()

			if (s1 > s2 || s1 === s2) {

				alert('error')
			}
			else
			{

				google.maps.event.clearListeners(mapObj.map, 'click');

				ajaxObj.filterData(true, s1, s2)

				$("#def").show();

			}

			if (s1 === "0") {

				ajaxObj.filterData(false)

				eventObj.mapClick()

			}

		})
	}
	default()
	{

		$("#def").on("click", function() {

			ajaxObj.filterData(false)

			eventObj.mapClick()

			$(this).hide()

		})

	}
	mapClick()
	{
		google.maps.event.addListener(mapObj.map, 'click', function(event) {

			google.maps.event.clearListeners(mapObj.map, 'idle');

			google.maps.event.clearListeners(mapObj.map, 'click');

			for (let i = 0; i < dataObj.markers.length; i++) {

				google.maps.event.clearListeners(dataObj.markers[i], "click")
				
			}

			customMarker = new google.maps.Marker({
	        	position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
	        	map: mapObj.map,
	        	animation: google.maps.Animation.DROP,
	        	icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	    	})

			mapObj.map.setCenter(customMarker.position)

			lat = event.latLng.lat()

			lng = event.latLng.lng()

			let div = document.getElementById('main')

	  		div.innerHTML = ""

	  		let bloc3 = document.createElement("div")

	  		bloc3.id = "bloc3"

	  		let label1 = document.createElement("label")

	  		label1.textContent = "Restaurant name"

	  		let input1 = document.createElement("input")

	  		input1.id = "input1"

	  		let label2 = document.createElement("label")

	  		label2.textContent = "Restaurant address"

	  		let input2 = document.createElement("input")

	  		input2.id = "input2"

	  		let select = document.createElement("select")

	  		select.id = "select"

	  		let labS = document.createElement("label")

	  		labS.textContent = "Select the rating :"

	  		for (let i = 1; i < 6; i++) {

	  			let option = document.createElement("option")

	  			option.value = i

	  			option.textContent = i

	  			select.appendChild(option)
	  			
	  		}

	  		let labT = document.createElement("label")

	  		labT.textContent = "Your comment : "

	  		let textarea = document.createElement("textarea")

	  		textarea.id = "textarea"

	  		let button = document.createElement("button")

	  		button.textContent = "send"

	  		button.id = "send"

	  		let button2 = document.createElement("button")

	  		button2.textContent = "stop"

	  		button2.id = "stop"

	  		label1.appendChild(input1)
	  		label2.appendChild(input2)
	  		labS.appendChild(select)
	  		labT.appendChild(textarea)

	  		bloc3.appendChild(label1)
	  		bloc3.appendChild(label2)
	  		bloc3.appendChild(labS)
	  		bloc3.appendChild(labT)
	  		bloc3.appendChild(button)
	  		bloc3.appendChild(button2)
	  		div.appendChild(bloc3)

		})
	}
	sendData()
	{

		$("#main").on("click", "#send", function() {

			if ($('#input1').val() === "" || $('#input2').val() === "" || $('#textarea').val() === "") {

				alert('one of the feilds are empty')
			}
			else
			{

			let input1 = $('#input1').val()

			let input2 = $('#input2').val()

			let select = Number($('#select').val())

			let textarea = $('#textarea').val()

			dataObj.put(input1, input2, lat, lng, select, textarea)

			}

		})
	}
	onComment()
	{
		$("#main").on("click", ".coInfo", function() {

			if ($("#comment").val() === "") {

				alert('write a comment please')
			}
			else
			{
				let comment = $("#comment").val()

				let star = Number($("#rate").val())

				let num = $(this).attr("id")

				dataObj.save(comment, star, num)

			}

		})
	}
	stop()
	{
		$("#main").on("click", "#stop", function() {

			let div = document.getElementById('main')

		  	div.innerHTML = ""

		  	customMarker.setMap(null)

		  	ajaxObj.update()

		})

	}

}

let eventObj = new Events

let lat

let lng

let customMarker