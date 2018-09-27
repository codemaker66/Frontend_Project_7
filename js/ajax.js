class Ajax
{
	constructor()
	{
		this.data
	}
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
	getData()
	{
		this.init("json/data.json", (result) => {

			this.data = JSON.parse(result)

				let count = 0

				this.data.forEach((dat) => {

					dataObj.init(dat)

					eventObj.markerClick(count)

			        count++

				})

				eventObj.mapIdle()

				eventObj.itemClick()

				eventObj.backToList()

				eventObj.filter()

				eventObj.mapClick()

				eventObj.sendData()

				eventObj.onComment()

		})
	}
	filterData(check, s1, s2)
	{

		if (check) {

			let res = this.data.filter(d => {
	  			let avg = d.ratings.reduce((a, r) => a + r.stars, 0) / d.ratings.length;
	  			return avg >= s1 && avg <= s2;
			});

	    	dataObj.clearData()

			let count = 0

			res.forEach((dat) => {

				if (dat.check === true) {

				dataObj.init(dat, true)
				}
				else
				{
					dataObj.init(dat)
				}

				eventObj.markerClick(count)

		    	count++

			})

			dataObj.showList()

		}
		else{

			dataObj.clearData()

			let count = 0

			this.data.forEach((dat) => {

				if (dat.check === true) {

				dataObj.init(dat, true)
				}
				else
				{
					dataObj.init(dat)
				}

				eventObj.markerClick(count)

		        count++

			})

			dataObj.showList()

		}
	}
	update()
	{
		dataObj.clearData()

	  	let count = 0

		this.data.forEach((dat) => {

			if (dat.check === true) {

				dataObj.init(dat, true)
			}
			else
			{
				dataObj.init(dat)
			}

			eventObj.markerClick(count)

	        count++

		})

		dataObj.showList()

		eventObj.mapClick()
	}
}

let ajaxObj = new Ajax()

ajaxObj.getData()