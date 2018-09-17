ajaxGet("json/data.json", (result) => {

	let data = JSON.parse(result)

	data.forEach((dat) => {

		start.restMarkers(dat)

		google.maps.event.addListener(start.marker, "click", function() {

            start.show(dat)

        })	

	})

	$("#main").on("click", ".bloc", function () {

    	let num = $(this).attr("id")

    	start.showBloc(num)
   
	})

})