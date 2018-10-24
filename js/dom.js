class Dom
{
  getStars(rating) {

        // Round to nearest half
        rating = Math.round(rating * 2) / 2;
        let output = [];

        // Append all the filled whole stars
        for (var i = rating; i >= 1; i--)
          output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // If there is a half a star, append it
        if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        // Fill the empty stars
        for (let i = (5 - rating); i >= 1; i--)
          output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        return output.join('');

  }

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

		      	let p1 = document.createElement("h4")
		      	p1.textContent = data[i].name

		      	let p2 = document.createElement("p")
            if (data[i].rating === undefined) {

              p2.textContent = `il n'ya pas de notes pour ce restaurant`
            }
            else
            {
              p2.innerHTML = `${data[i].rating} ${domObj.getStars(data[i].rating)}`
            }

            let p3 = document.createElement("p")
            p3.style.color = "#737373"
            p3.textContent = data[i].vicinity

		      	bloc.appendChild(p1)
		      	bloc.appendChild(p2)
		      	bloc.appendChild(p3)
		      	div.appendChild(bloc)

	    	}
	  	}	

      if (div.innerHTML === "") {

        let bloc = document.createElement('div')

        bloc.classList.add("bloc")

        let h4 = document.createElement('h4')

        h4.textContent = "Aucun restaurants dans cette position !!"

        let p = document.createElement('p')

        p.textContent = "Veuiez dézoomer ou chercher des restaurants dans une autre posistion"

        p.style.color = "#737373"

        bloc.appendChild(h4)
        bloc.appendChild(p)
        div.appendChild(bloc)

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

      let img = document.createElement('img')
      img.src = 'cbk.jpg'
      img.classList.add("img-responsive")
      img.classList.add('img-rounded')

        let p1 = document.createElement("h3")
        p1.textContent = place.name

      	let p2 = document.createElement("p")
        p2.style.color = "#737373"
      	p2.textContent = place.vicinity

      	let p3 = document.createElement("p")
      	/*if (place.rating !== undefined) {
            p3.textContent = `la moyennes est de ${place.rating} etoiles`
        }
        else */if (data[i].rating !== undefined) {

          p3.innerHTML = `${data[i].rating} ${domObj.getStars(data[i].rating)}`

        }
        else
        {
          p3.textContent = `il n'ya pas de notes pour ce restaurant`
        }

        let hr1 = document.createElement('hr')

        let ins = document.createElement("div")

        if (place.reviews !== undefined) {

        let h4 = document.createElement('h4')

        h4.textContent = "Avis des utilisateurs google :"

        ins.appendChild(h4)

            for (let j = 0; j < place.reviews.length; j++) {

            let p4 = document.createElement("p")

            let p5 = document.createElement("p")

            let p6 = document.createElement('p')

            let hr = document.createElement('hr')

            p4.textContent = place.reviews[j].author_name 

            p5.innerHTML = `${domObj.getStars(place.reviews[j].rating)}`

            if (place.reviews[j].text.length !== 0) {

              p6.textContent = place.reviews[j].text

            }
            else
            {
                p6.textContent = "L'utilisateur n'a pas laisser de commentaires"
            }

            ins.appendChild(p4)
            ins.appendChild(p5)
            ins.appendChild(p6)
            ins.appendChild(hr)
        
          }

        }
        else
        {
          let p4 = document.createElement("p")

          let hr = document.createElement('hr')

          p4.textContent = "Aucun commentaires des utilasteurs google pour ce restaurant :("

          ins.appendChild(p4)
          ins.appendChild(hr)

        }

        let cv = document.createElement('div')

        if (data[i].comment !== undefined) {

          let ha = document.createElement('h4')

          ha.textContent = "Vos avis :"

          cv.appendChild(ha)

              for (let j = 0; j < data[i].comment.length; j++) {

                  let p = document.createElement("p")

                  let hr = document.createElement('hr')

                  let p2 = document.createElement('p')

                  let p3 = document.createElement('p')

                  p2.innerHTML = `${domObj.getStars(data[i].userRating[j])}`

                  p.textContent = data[i].userName[j]

                  p3.textContent = data[i].comment[j]

                cv.appendChild(p)
                cv.appendChild(p2)
                cv.appendChild(p3)
                cv.appendChild(hr)
                
              }

        }

        let form = document.createElement('div')

        form.innerHTML = `
        <form>
          <legend style="border-bottom: 0px;">Ajouter un avis :</legend>
            <div class="form-group">
              <label for="userName">Votre nom : </label>
              <input id="userName" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label for="rate">choisisez une note : </label>
              <select id="rate" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="form-group">
              <label for="comment">Votre Commentaire : </label>
              <textarea id="comment" class="form-control"></textarea>
            </div>
            <div class="form-group">
              <button type="button" class="pull-right btn coInfo" id="${i}">Envoyer</button>
            </div>
        </form>`

        cv.appendChild(form)

      	let button = document.createElement("button")

      	button.classList.add("return")

        button.classList.add("btn")

        button.classList.add("btn-default")

        button.style.marginBottom = "20px"

      	button.id = i

      	button.type = "button"

      	button.textContent = "Retourner a la liste"

        if (ajaxObj.filter === false) {

          $('#bc').attr('disabled', true)

        }

        bloc2.appendChild(button)

        bloc2.appendChild(img)
      	bloc2.appendChild(p1)
      	bloc2.appendChild(p3)
      	bloc2.appendChild(p2)
        bloc2.appendChild(hr1)
      	bloc2.appendChild(ins)
      	bloc2.appendChild(cv)
      	div.appendChild(bloc2)
	}
	createRestaurant()
	{

		let div = document.getElementById('main')

  		div.innerHTML = ""

  		let bloc3 = document.createElement("div")

  		bloc3.id = "bloc3"

      bloc3.innerHTML = `<form>
          <legend style="border-bottom: 0px;">Ajouter un restaurant:</legend>
            <div class="form-group">
              <label for="input1">Nom de l'etablisement: </label>
              <input id="input1" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label for="input2">L'address: </label>
              <input id="input2" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label for="user">Votre nom : </label>
              <input id="user" type="text" class="form-control">
            </div>
            <div class="form-group">
              <label for="select">Notez ce restaurants : </label>
              <select id="select" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div class="form-group">
              <label for="textarea">Ajouter un Commentaire : </label>
              <textarea id="textarea" class="form-control"></textarea>
            </div>
            <div class="form-group">
              <button type="button" class="pull-right btn" id="send">Créé</button>
              <button type="button" class="pull-left btn" id="stop">Anuller</button>
            </div>
        </form>`

  		div.appendChild(bloc3)
	}
  put(input1, input2, select, user, textarea)
  {

    ajaxObj.dataArray.push({
          name: input1,
          vicinity: input2,
          geometry: {location: mapObj.tempMarker.position},
          custom: true
    })

    mapObj.tempMarker.setMap(null)

    domObj.save(textarea, select, input1, user)

  }
  save(comment, star, name, userName)
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

        if (ajaxObj.dataArray[i].userName === undefined) {

          ajaxObj.dataArray[i].userName = [userName]

        }
        else
        {
          ajaxObj.dataArray[i].userName.push(userName)
        }

        if (ajaxObj.dataArray[i].userRating === undefined) {

          ajaxObj.dataArray[i].userRating = [star]

        }
        else
        {
          ajaxObj.dataArray[i].userRating.push(star)
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