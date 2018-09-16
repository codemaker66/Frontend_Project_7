ajaxGet("json/data.json", (result) => {

	let data = JSON.parse(result)

	let start = new gMap

	google.maps.event.addDomListener(window, 'load', start.init())

	data.forEach((dat) => {

		start.restMarkers(dat.lat, dat.long)

	})


})