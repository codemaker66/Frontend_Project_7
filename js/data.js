ajaxGet("json/data.json", (result) => {

	let data = JSON.parse(result)

	let count = 0

	data.forEach((dat) => {

		start.restMarkers(dat)

		start.cli(dat, count)	

        count++

	})

	$("#main").on("click", ".bloc", function () {

    	let num = $(this).attr("id")

    	start.showBloc(num)
   
	})

	$("#main").on("click", ".btn", function () { 

		let num = $(this).attr("id")

		markers[num].setIcon()

		initRest()

	})

})