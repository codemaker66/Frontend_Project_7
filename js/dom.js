class Dom
{
	//This method generate the stars from the given rating value
	generateStars(rating)
	{
		let i
		let output = []
		rating = Math.round(rating * 2) / 2
		for (i = rating; i >= 1; i--){
			output.push("<i class='fa fa-star' aria-hidden='true'></i>&nbsp;")
		}
		if (i === .5){
			output.push("<i class='fa fa-star-half-o' aria-hidden='true'></i>&nbsp;")
		}
		for (let i = (5 - rating); i >= 1; i--){
			output.push("<i class='fa fa-star-o' aria-hidden='true'></i>&nbsp;")
		}
		return output.join("")
	}
	//This method create a list of all the restaurants whose their markers are visible in the screen
	showList()
	{
		let main = document.getElementById("main")
		main.innerHTML = ""
		for (let i = 0; i < restObj.markers.length; i++){
			if(mapObj.map.getBounds().contains(restObj.markers[i].getPosition())){
				let item = document.createElement("div")
				item.classList.add("item")
				item.id = i
				let h4 = document.createElement("h4")
				h4.textContent = dataObj.dat[i].name
				let p = document.createElement("p")
				if (dataObj.dat[i].rating === undefined) {
					p.textContent = "Ce restaurant n'a aucune note."
				}
				else
				{
					p.innerHTML = `${dataObj.dat[i].rating.toFixed(1)} ${domObj.generateStars(dataObj.dat[i].rating)}`
				}
				let p2 = document.createElement("p")
				p2.style.color = "#737373"
				p2.textContent = dataObj.dat[i].vicinity
				item.appendChild(h4)
				item.appendChild(p)
				item.appendChild(p2)
				main.appendChild(item)
			}
		}	
		if (main.innerHTML === "") {
			let bloc = document.createElement("div")
			bloc.classList.add("bloc")
			let h4 = document.createElement("h4")
			h4.textContent = "Aucun restaurant n'est visible à cet endroit !!"
			let p = document.createElement("p")
			p.textContent = "Essayez de dézoomer ou de déplacer la carte vers un endroit où il y a des restaurants."
			p.style.color = "#737373"
			bloc.appendChild(h4)
			bloc.appendChild(p)
			main.appendChild(bloc)
		}
	}
	//This method display all the details of a restaurant
	showDetails(place, i)
	{
		restObj.markers[i].setIcon("icons/selected_restaurant.png")
		restObj.markers[i].zIndex = 9999
		google.maps.event.clearListeners(mapObj.map, "idle")
		google.maps.event.clearListeners(mapObj.map, "click")
		if (dataObj.filter === false) {
			$("#filter").attr("disabled", true)
		}
		let main = document.getElementById("main")
		main.innerHTML = ""
		let bloc = document.createElement("div")
		bloc.classList.add("bloc")
		let button = document.createElement("button")
		button.classList.add("return", "btn", "btn-default")
		button.id = i
		button.textContent = "Retourner à la liste"
		let img = document.createElement("img")
		img.src = `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=
		${dataObj.dat[i].geometry.location.lat()},${dataObj.dat[i].geometry.location.lng()}
		&fov=90&heading=235&pitch=10&key=YOUR_API_KEY`
		img.classList.add("img-responsive", "img-rounded")
		let h3 = document.createElement("h3")
		h3.textContent = place.name
		let p = document.createElement("p")  
		if (dataObj.dat[i].rating !== undefined) {
			p.innerHTML = `${dataObj.dat[i].rating.toFixed(1)} ${domObj.generateStars(dataObj.dat[i].rating)}`
		}
		else
		{
			p.textContent = "Ce restaurant n'a aucune note."
		}
		let p2 = document.createElement("p")
		p2.style.color = "#737373"
		p2.textContent = place.vicinity
		let hr = document.createElement("hr")
		let usersReviews = document.createElement("div")
		if (place.reviews !== undefined) {
			let h4 = document.createElement("h4")
			h4.textContent = "Avis des utilisateurs de Google :"
			usersReviews.appendChild(h4)
			for (let j = 0; j < place.reviews.length; j++) {
				let p = document.createElement("p")
				let p2 = document.createElement("p")
				let p3 = document.createElement("p")
				let hr = document.createElement("hr")
				p.textContent = place.reviews[j].author_name 
				p2.innerHTML = `${domObj.generateStars(place.reviews[j].rating)}`
				if (place.reviews[j].text.length !== 0) {
					p3.textContent = place.reviews[j].text
				}
				else
				{
					p3.textContent = "Cet utilisateur n'a laissé aucun commentaire."
				}
				usersReviews.appendChild(p)
				usersReviews.appendChild(p2)
				usersReviews.appendChild(p3)
				usersReviews.appendChild(hr)
			}
		}
		else
		{
			let p = document.createElement("p")
			let hr = document.createElement("hr")
			p.textContent = "Aucun commentaire des utilisateurs de Google pour ce restaurant."
			usersReviews.appendChild(p)
			usersReviews.appendChild(hr)
		}
		let customReviews = document.createElement("div")
		if (dataObj.dat[i].comment !== undefined) {
			let h4 = document.createElement("h4")
			h4.textContent = "Vos avis :"
			customReviews.appendChild(h4)
			for (let j = 0; j < dataObj.dat[i].comment.length; j++) {
				let p = document.createElement("p")
				let p2 = document.createElement("p")
				let p3 = document.createElement("p")
				let hr = document.createElement("hr")
				p.textContent = dataObj.dat[i].userName[j]
				p2.innerHTML = `${domObj.generateStars(dataObj.dat[i].userRating[j])}`
				p3.textContent = dataObj.dat[i].comment[j]
				customReviews.appendChild(p)
				customReviews.appendChild(p2)
				customReviews.appendChild(p3)
				customReviews.appendChild(hr)
			}
		}
		let formBloc = document.createElement("div")
		formBloc.innerHTML = `
			<form>
				<legend>Ajouter un avis :</legend>
				<div class="form-group">
					<label for="userName">Votre nom :</label>
					<input id="userName" type="text" class="form-control">
				</div>
				<div class="form-group">
					<label for="rate">Sélectionner une note :</label>
					<select id="rate" class="form-control">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div class="form-group">
					<label for="comment">Votre commentaire :</label>
					<textarea id="comment" class="form-control"></textarea>
				</div>
				<div class="form-group">
					<button type="button" class="pull-right btn btn-default review" id="${i}">Envoyer</button>
				</div>
			</form>`
		customReviews.appendChild(formBloc)
		bloc.appendChild(button)
		bloc.appendChild(img)
		bloc.appendChild(h3)
		bloc.appendChild(p)
		bloc.appendChild(p2)
		bloc.appendChild(hr)
		bloc.appendChild(usersReviews)
		bloc.appendChild(customReviews)
		main.appendChild(bloc)
	}
	//This method show the custom restaurant form when the user click on the map
	showRestForm()
	{
		let main = document.getElementById("main")
		main.innerHTML = ""
		$(main).scrollTop(0)
		let bloc = document.createElement("div")
		bloc.classList.add("bloc")
		bloc.innerHTML = `
			<form>
				<legend>Ajouter un restaurant :</legend>
				<div class="form-group">
					<label for="restaurantName">Nom du restaurant :</label>
					<input id="restaurantName" type="text" class="form-control">
				</div>
				<div class="form-group">
					<label for="address">Adresse du restaurant :</label>
					<input id="address" type="text" class="form-control">
				</div>
				<div class="form-group">
					<label for="userName">Votre nom :</label>
					<input id="userName" type="text" class="form-control">
				</div>
				<div class="form-group">
					<label for="rate">Noter ce restaurant :</label>
					<select id="rate" class="form-control">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<div class="form-group">
					<label for="comment">Ajouter un commentaire :</label>
					<textarea id="comment" class="form-control"></textarea>
				</div>
				<div class="form-group">
					<button type="button" class="pull-right btn btn-default" id="create">Créé</button>
					<button type="button" class="pull-left btn btn-default" id="cancel">Anuller</button>
				</div>
			</form>`
		main.appendChild(bloc)
	}
}
let domObj = new Dom