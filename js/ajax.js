class Ajax
{
	init(url, callback)
	{
		let req = new XMLHttpRequest()

		req.open("GET", url)

		req.addEventListener("load", (e) => {

			if (req.status >= 200 && req.status < 400) {

				callback(req.responseText)

			}
			else
			{
				console.error(`${req.status} ${req.statusText} ${url}`)
			}
		})

		req.addEventListener("error", (e) => console.error(`Network error with the url : ${url}`))

		req.send(null)
	}
	getData(check, s1, s2)
	{
		this.init("json/data.json", (result) => {

			let data = JSON.parse(result)

			if (check) {

				let res = data.filter(d => {
	      			let avg = d.ratings.reduce((a, r) => a + r.stars, 0) / d.ratings.length;
	      			return avg >= s1 && avg <= s2;
	    		});

	    		ajaxObj.filterData(res)

			}
			else if (check === false) {

				dataObj.clearData()

				let count = 0

				data.forEach((dat) => {

					dataObj.init(dat)

					eventObj.markerClick(count)

			        count++

				})

				dataObj.showList()

			}
			else
			{

				let count = 0

				data.forEach((dat) => {

					dataObj.init(dat)

					eventObj.markerClick(count)

			        count++

				})

				eventObj.mapIdle()

				eventObj.itemClick()

				eventObj.backToList()

				eventObj.filter()

			}

		})
	}
	filterData(res)
	{

		dataObj.clearData()

		let count = 0

		res.forEach((dat) => {

			dataObj.init(dat)

			eventObj.markerClick(count)

		    count++

		})

		dataObj.showList()
	}
}

let ajaxObj = new Ajax

ajaxObj.getData()