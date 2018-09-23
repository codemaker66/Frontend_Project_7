class Events
{
	mapIdle()
	{
		google.maps.event.addListener(mapObj.map, 'idle', dataObj.showList)
	}
	markerClick(count)
	{
		google.maps.event.addListener(dataObj.markers[count], "click", (e) => {
  
                dataObj.markers.forEach((marker) => {

                  marker.setIcon()

                })  

                dataObj.showInfo(count)

    	})
	}
	itemClick()
	{
		$("#main").on("click", ".bloc", function () {

    		let num = $(this).attr("id")

    		dataObj.showInfo(num)
   
		})
	}
	backToList()
	{
		$("#main").on("click", ".btn", function () { 

			let num = $(this).attr("id")

			dataObj.markers[num].setIcon()

			dataObj.showList()

		})
	}
	filter()
	{
		$("#bc").on("click", function() { 

			let s1 = $("#s1").val()

			if (s1 === "0") {

				ajaxObj.getData(false)

			}
			else
			{
				let s2 = Number(s1) + 1

				ajaxObj.getData(true, s1, s2)
			}

		})
	}
}

let eventObj = new Events