class Dom
{
	showList()
	{
		
    let data = []

    if (ajaxObj.filter === true) {

      data = ajaxObj.tempData

    }
    else
    {
      data = ajaxObj.dataArray
    }

		let div = document.getElementById('main')

  		div.innerHTML = ""

	  	for (let i = 0; i < restObj.markers.length; i++){

	    	if(mapObj.map.getBounds().contains(restObj.markers[i].getPosition()) ){

		       	let bloc = document.createElement("div")

		      	bloc.classList.add("bloc")

		      	bloc.id = i

		      	let p1 = document.createElement("p")
		      	p1.textContent = data[i].name

		      	let p2 = document.createElement("p")
		      	p2.textContent = data[i].vicinity

		      	let p3 = document.createElement("p")
            if (data[i].rating === undefined) {
              p3.textContent = `il n'ya pas de notes pour ce restaurant`
            }
            else
            {
              p3.textContent = `la moyennes est de ${data[i].rating} etoiles`
            }

		      	bloc.appendChild(p1)
		      	bloc.appendChild(p2)
		      	bloc.appendChild(p3)
		      	div.appendChild(bloc)

	    	}
	  	}	
	}
	showInfo(place, i)
	{

    let data = []

    if (ajaxObj.filter === true) {

      data = ajaxObj.tempData

    }
    else
    {
      data = ajaxObj.dataArray
    }

		restObj.markers[i].setIcon('map_icons/restaurants.png')

		google.maps.event.clearListeners(mapObj.map, 'idle')

    google.maps.event.clearListeners(mapObj.map, 'click')

	    let div = document.getElementById('main')

	    div.innerHTML = ""

	    let bloc2 = document.createElement("div")

		bloc2.id = "bloc2"

        let p1 = document.createElement("p")
        p1.id = "name"
        p1.textContent = place.name

      	let p2 = document.createElement("p")
      	p2.textContent = place.vicinity

      	let p3 = document.createElement("p")
      	/*if (place.rating !== undefined) {
            p3.textContent = `la moyennes est de ${place.rating} etoiles`
        }
        else */if (data[i].rating !== undefined) {

          p3.textContent = `la moyennes est de ${data[i].rating} etoiles`

        }
        else
        {
          p3.textContent = `il n'ya pas de notes pour ce restaurant`
        }

      	let ins = document.createElement("div")

        if (place.reviews !== undefined) {

            for (let j = 0; j < place.reviews.length; j++) {

            let p4 = document.createElement("p")

            let p5 = document.createElement("p")

            p4.textContent = place.reviews[j].rating

            if (place.reviews[j].text.length !== 0) {

              p5.textContent = place.reviews[j].text

            }
            else
            {
                p5.textContent = "L'utilisateur n'a pas laisser de commentaires"
            }

            ins.appendChild(p4)
            ins.appendChild(p5)
        
          }

        }
        else
        {
          let p4 = document.createElement("p")

          p4.textContent = "Aucun commentaires des utilasteurs google pour ce restaurant :("

          ins.appendChild(p4)

        }

          if (data[i].comment !== undefined) {

              for (let j = 0; j < data[i].comment.length; j++) {

                  let p6 = document.createElement("p")

                p6.textContent = data[i].comment[j]

                ins.appendChild(p6)
                
              }

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

      	send.id = i

      	send.textContent = "send"

      	let button = document.createElement("button")

      	button.classList.add("btn")

      	button.id = i

      	button.type = "button"

      	button.textContent = "return to restaurants"

      	label.appendChild(text)
      	rateLabel.appendChild(rate)


      	bloc2.appendChild(p1)
      	bloc2.appendChild(p2)
      	bloc2.appendChild(p3)
      	bloc2.appendChild(ins)
      	bloc2.appendChild(label)
      	bloc2.appendChild(rateLabel)
      	bloc2.appendChild(send)
      	div.appendChild(bloc2)
      	div.appendChild(button)
	}
	createRestaurant()
	{

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
	}
  put(input1, input2, select, textarea)
  {

    ajaxObj.dataArray.push({
          name: input1,
          vicinity: input2,
          geometry: {location: mapObj.tempMarker.position},
          rating: select,
          comment: [textarea],
          custom: true
    })

      let div = document.getElementById('main')

      div.innerHTML = ""

      mapObj.tempMarker.setMap(null)

      ajaxObj.getResponse(false)

  }
  save(comment, star, name)
  {

    for (var i = 0; i < ajaxObj.dataArray.length; i++) {
      if (ajaxObj.dataArray[i].name === name) {

        if (ajaxObj.dataArray[i].rating === undefined) {

           ajaxObj.dataArray[i].rating = star

        }
        else
        {
          let total = ajaxObj.dataArray[i].rating + star

          ajaxObj.dataArray[i].rating = total/2
        }

        if (ajaxObj.dataArray[i].comment === undefined) {

          ajaxObj.dataArray[i].comment = [comment]

        }
        else
        {
          ajaxObj.dataArray[i].comment.push(comment)
        }
        break;
      }
    }


    let div = document.getElementById('main')

    div.innerHTML = ""

    if (ajaxObj.filter === true) {

      ajaxObj.filterData()
    }
    else
    {
      ajaxObj.getResponse(false)
    }

  }
}

let domObj = new Dom()