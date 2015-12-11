/////////////////////////////////////////////////////////////////////////
// just an example setup with hashchange, uniloc and redux like engine //
/////////////////////////////////////////////////////////////////////////

// basic haschange setup

function onHashChange() {
	// do something with window.location.hash
	console.log(window.location.hash);
}

// handle the browser nagivation events
window.addEventListener('haschange', onHashChange, false);