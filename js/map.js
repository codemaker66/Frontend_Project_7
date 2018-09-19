let markers = []

let array = []

let loc = []

class gMap
{
  init()
	{
    this.map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 48.864716, lng: 2.349014},
		  zoom: 10
		})

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        let marker = new google.maps.Marker({
	  		  position: pos,
	  		  map: this.map
		    })

        this.map.setCenter(pos)

      }, function() {
            handleLocationError(true)
        })

    } 
    else 
    {
      // Browser doesn't support Geolocation
      handleLocationError(false)
    }

    function handleLocationError(browserHasGeolocation) {

      browserHasGeolocation ? alert(`Error: The Geolocation service failed`) :
                              alert(`Error: Your browser doesn't support geolocation`)
            
    }

	}

  cli(dat, count)
  {

    google.maps.event.addListener(markers[count], "click", (e) => {

            
                markers.forEach((mar) => {

                  mar.setIcon()

                })

                this.show(dat, count)
      

            

    })

  }

  showBloc(num)
  {

    markers[num].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

    google.maps.event.clearListeners(this.map, 'idle');

    let div = document.getElementById('main')

    div.innerHTML = ""

    let bloc2 = document.createElement("div")

    bloc2.id = "bloc2"

      let p1 = document.createElement("p")
      p1.textContent = array[num][0]

      let p2 = document.createElement("p")
      p2.textContent = array[num][1]

      let test = 0

      for (let j = 0; j < array[num][2].length; j++) {

        test += array[num][2][j].stars
       
        
      }

      let p3 = document.createElement("p")
      p3.textContent = `la moyennes est de ${test/array[num][2].length} etoiles`

      let ins = document.createElement("div")

      for (let j = 0; j < array[num][2].length; j++) {

        let p4 = document.createElement("p")

        p4.textContent = array[num][2][j].comment

        ins.appendChild(p4)
        
      }

      let button = document.createElement("button")

      button.classList.add("btn")

      button.id = num

      button.type = "button"

      button.textContent = "return to restaurants"

      let img = document.createElement("img")

      img.src = `https://maps.googleapis.com/maps/api/streetview?size=90x80&location=${loc[num][0]},
      ${loc[num][1]}&fov=90&heading=235&pitch=10&key=YOUR_API_KEY`


      bloc2.appendChild(p1)
      bloc2.appendChild(p2)
      bloc2.appendChild(p3)
      bloc2.appendChild(ins)
      bloc2.appendChild(img)
      div.appendChild(bloc2)
      div.appendChild(button)

  }

  show(dat, count)
  {

    markers[count].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')

     google.maps.event.clearListeners(this.map, 'idle');

    let div = document.getElementById('main')

    div.innerHTML = ""

    let bloc2 = document.createElement("div")

    bloc2.id = "bloc2"

      let p1 = document.createElement("p")
      p1.textContent = dat.restaurantName

      let p2 = document.createElement("p")
      p2.textContent = dat.address

      let test = 0

      for (let j = 0; j < dat.ratings.length; j++) {

        test += dat.ratings[j].stars
       
        
      }

      let p3 = document.createElement("p")
      p3.textContent = `la moyennes est de ${test/dat.ratings.length} etoiles`

      let ins = document.createElement("div")

      for (let j = 0; j < dat.ratings.length; j++) {

        let p4 = document.createElement("p")

        p4.textContent = dat.ratings[j].comment

        ins.appendChild(p4)
        
      }

      let button = document.createElement("button")

      button.classList.add("btn")

      button.id = count

      button.type = "button"

      button.textContent = "return to restaurants"

      let img = document.createElement("img")

      img.src = `https://maps.googleapis.com/maps/api/streetview?size=90x80&location=${loc[count][0]},
      ${loc[count][1]}&fov=90&heading=235&pitch=10&key=YOUR_API_KEY`


      bloc2.appendChild(p1)
      bloc2.appendChild(p2)
      bloc2.appendChild(p3)
      bloc2.appendChild(ins)
      bloc2.appendChild(img)
      div.appendChild(bloc2)
      div.appendChild(button)
        
    


  }

  restMarkers(data)
  {
    this.marker = new google.maps.Marker({
        position: {lat: data.lat, lng: data.long},
        map: this.map,
        click: false
    })

    markers.push(this.marker)

    let dat = []

    dat.push(data.restaurantName, data.address, data.ratings)

    array.push(dat)
  }

  initR()
  {
    google.maps.event.addListener(start.map, 'idle', initRest)

    
  }


}

let start = new gMap

google.maps.event.addDomListener(window, 'load', start.init())

start.initR()

function initRest()
{

  if (google.maps.event.hasListeners(start.map,'idle') === false) {

    start.initR()

  }

  

  let div = document.getElementById('main')

  div.innerHTML = ""

  for (let i = 0; i < markers.length; i++){

    if(start.map.getBounds().contains(markers[i].getPosition()) ){

       let bloc = document.createElement("div")

      bloc.classList.add("bloc")

      bloc.id = i

      let p1 = document.createElement("p")
      p1.textContent = array[i][0]

      let p2 = document.createElement("p")
      p2.textContent = array[i][1]

      let test = 0

      for (let j = 0; j < array[i][2].length; j++) {

        test += array[i][2][j].stars
       
        
      }

      let p3 = document.createElement("p")
      p3.textContent = `la moyennes est de ${test/array[i][2].length} etoiles`


      bloc.appendChild(p1)
      bloc.appendChild(p2)
      bloc.appendChild(p3)
      div.appendChild(bloc)
        
    }

  }


}





