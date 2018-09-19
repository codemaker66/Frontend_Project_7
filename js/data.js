ajaxGet("json/data.json", (result) => {

	let data = JSON.parse(result)

	let count = 0

	data.forEach((dat) => {

		start.restMarkers(dat)

		let arr = []

		arr.push(dat.lat, dat.long)

		loc.push(arr)

		start.cli(dat, count)	

        count++

	})

	$("#bc").on("click", function() {

		let s1 = $("#s1").val()

		let s2

		if (s1 === "def") {

			s1 = 0

			s2 = 5

		}
		else
		{
			s2 = Number(s1) + 1
		}

		res = data.filter(d => {
      let avg = d.ratings.reduce((a, r) => a + r.stars, 0) / d.ratings.length;
      return avg >= s1 && avg <= s2;
    });

			clearOverlays()

			array.length = 0

			loc.length = 0

			let count = 0

		res.forEach((dat) => {

		start.restMarkers(dat)

		let arr = []

		arr.push(dat.lat, dat.long)

		loc.push(arr)

		start.cli(dat, count)	

        count++

	})

		initRest()

		console.log(res)


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

function clearOverlays() {
  for (var i = 0; i < markers.length; i++ ) {
    markers[i].setMap(null);
  }
  markers.length = 0;
  let div = document.getElementById('main')

    div.innerHTML = ""
}