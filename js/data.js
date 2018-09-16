ajaxGet("json/data.json", (result) => {

	let data = JSON.parse(result)

	data.forEach((dat) => {

		start.restMarkers(dat)

	})

})