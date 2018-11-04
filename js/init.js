class initialize
{
	constructor()
	{
		this.firstLaunch = true
	}
	//This method initialize the app by calling the init method of the object mapObj
	initApp()
	{
		mapObj.init()
	}
	//This method initialize all the needed events for the app
	initEvents()
	{
		mapObj.idle()
		mapObj.click()
		mapObj.dragEnd()
		mapObj.search()
		restObj.backToList()
		restObj.itemClick()
		restObj.filter()
		restObj.default()
		restObj.cancel()
		restObj.create()
		restObj.restReview()
		restObj.onHover()
		restObj.onLeave()
	}
	//This method check for disabled events or buttons to re-enable them if needed
	checkEvents()
	{
		if (dataObj.filter !== true) {
			if (google.maps.event.hasListeners(mapObj.map,"idle") === false) {
    			mapObj.idle()
  			}
		    if (google.maps.event.hasListeners(mapObj.map,"click") === false) {
				mapObj.click()
			}
			if (google.maps.event.hasListeners(mapObj.map,"dragend") === false) {
    			mapObj.dragEnd()
  			}
  			if ($("#main").off("mouseover")) {
  				restObj.onHover()
  			}
			if($("#filter").is(":disabled")){
				$("#filter").attr("disabled", false)
			}
		}
		else
		{
			mapObj.idle()
			restObj.onHover()
		}
	}
}
let initObj = new initialize
initObj.initApp()