class Data
{

	constructor()
	{
		this.marker
		this.markers = []
		this.dat = []
	}
	init(data, check)
	{
		if (check === true) {

			this.restMarkers(data.lat, data.long, true)
		}
		else
		{
			this.restMarkers(data.lat, data.long)
		}

		let array = []

		array.push(data.restaurantName, data.address, [data.lat, data.long], data.ratings)

		this.dat.push(array)

	}
	restMarkers(lat, lng, check)
  	{
	    if (check === true) {

	    	this.marker = new google.maps.Marker({
	        	position: {lat: lat, lng: lng},
	        	map: mapObj.map,
	        	custom: true,
	        	icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
	    	})
	    }
	    else
	    {
	    	this.marker = new google.maps.Marker({
	        	position: {lat: lat, lng: lng},
	        	map: mapObj.map
	    	})
	    }

	    this.markers.push(this.marker)
  	}
  	showList()
	{

  		if (google.maps.event.hasListeners(mapObj.map,'idle') === false) {

    		eventObj.mapIdle()

  		}

		let div = document.getElementById('main')

	  	div.innerHTML = ""

	  	for (let i = 0; i < dataObj.markers.length; i++){

	    	if(mapObj.map.getBounds().contains(dataObj.markers[i].getPosition()) ){

		       	let bloc = document.createElement("div")

		      	bloc.classList.add("bloc")

		      	bloc.id = i

		      	let p1 = document.createElement("p")
		      	p1.textContent = dataObj.dat[i][0]

		      	let p2 = document.createElement("p")
		      	p2.textContent = dataObj.dat[i][1]

		      	let test = 0

		      	for (let j = 0; j < dataObj.dat[i][3].length; j++) {

		        	test += dataObj.dat[i][3][j].stars   
		        
		      	}

		      	let p3 = document.createElement("p")
		      	p3.textContent = `la moyennes est de ${test/dataObj.dat[i][3].length} etoiles`

		      	bloc.appendChild(p1)
		      	bloc.appendChild(p2)
		      	bloc.appendChild(p3)
		      	div.appendChild(bloc)

	    	}

	  	}		
  		
	}
	showInfo(count)
	{
	
	this.markers[count].setIcon('map_icons/restaurants.png')

     google.maps.event.clearListeners(mapObj.map, 'idle');

    let div = document.getElementById('main')

    div.innerHTML = ""

    let bloc2 = document.createElement("div")

	bloc2.id = "bloc2"

      let p1 = document.createElement("p")
      p1.textContent = this.dat[count][0]

      let p2 = document.createElement("p")
      p2.textContent = this.dat[count][1]

      let test = 0

      for (let j = 0; j < this.dat[count][3].length; j++) {

        test += this.dat[count][3][j].stars
       
        
      }

      let p3 = document.createElement("p")
      p3.textContent = `la moyennes est de ${test/this.dat[count][3].length} etoiles`

      let ins = document.createElement("div")

      for (let j = 0; j < this.dat[count][3].length; j++) {

        let p4 = document.createElement("p")

        p4.textContent = this.dat[count][3][j].comment

        ins.appendChild(p4)
        
      }

      let label = document.createElement("label")

	  label.textContent = "Comment here :"

	  let text = document.createElement("textarea")

	  text.id = "comment"

	  let rate = document.createElement("select")

	  rate.id = "rate"

	  let rateLabel = document.createElement("label")

	  rateLabel.textContent = "Select the rating :"

	  for (let i = 1; i < 6; i++) {

	  	let option = document.createElement("option")

		option.value = i

		option.textContent = i

		rate.appendChild(option)
		
	  }

	  let send = document.createElement('button')

	  send.classList.add("coInfo")

      send.id = count

      send.textContent = "send"

      let button = document.createElement("button")

      button.classList.add("btn")

      button.id = count

      button.type = "button"

      button.textContent = "return to restaurants"

      label.appendChild(text)
      rateLabel.appendChild(rate)


      bloc2.appendChild(p1)
      bloc2.appendChild(p2)
      bloc2.appendChild(p3)
      bloc2.appendChild(ins)
      /*bloc2.appendChild(img)*/
      bloc2.appendChild(label)
      bloc2.appendChild(rateLabel)
      bloc2.appendChild(send)
      div.appendChild(bloc2)
      div.appendChild(button)

	}
	clearData()
	{
		for (var i = 0; i < this.markers.length; i++ ) {
	    	this.markers[i].setMap(null);
	  	}
	  	this.markers.length = 0;
	  	this.dat.length = 0
	  	let div = document.getElementById('main')

	    div.innerHTML = ""
	}
	put(input1, input2, lat, lng, select, textarea)
	{
		ajaxObj.data.push({
      		"restaurantName":input1,
      		"address":input2,
      		"lat":lat,
      		"long":lng,
      		"check": true,
      		"ratings":[
		         {
		            "stars":select,
		            "comment":textarea
		         }
      		]
   		})

   		let div = document.getElementById('main')

	  	div.innerHTML = ""

	  	customMarker.setMap(null)

	  	ajaxObj.update()
	}
	save(comment, star, num)
	{
		ajaxObj.data[num].ratings.push({
            "stars":star,
            "comment":comment
        })

		let div = document.getElementById('main')

	  	div.innerHTML = ""

	  	ajaxObj.update()
	}

}

let dataObj = new Data