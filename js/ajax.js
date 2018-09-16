function ajaxGet(url, callback)
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