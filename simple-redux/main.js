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

// example named routes definitions with uniloc
var Routes = uniloc({
	// route name: route parameters denotd by :
	root: 'GET /',
	documentList: 'GET /:userID/:documentID',
	documentEdit: 'GET /:userID/:documentID/edit',
})

// use ROUTES.lookup(url) returns object where name: 'route name', options: {route parameters}
// use ROUTES.generate('route name', {route parameters}) to generate a URL

// now we have a location object for the user, we put that in a Redux store which only has one state

// The navigation action to be called when the browser navigates
function navigationComplete() {
	return {
		type: 'NAVIGATION/COMPLETE',
		location: ROUTES.lookup(window.location.hash.substr(1)),
	}
}

// The reducer to manage the navigation-related state
function navigationReducer(state = {
	location: null,
}, action) {
	switch (action.type) {
		case 'NAVIGATION/COMPLETE',
			return {
				location: action.location,
			}

		default: return state
	}
}

// example view to re-render based on the stored state
var APP_NODE = document.getElementById('react-app');
// wrap the view in a function which subscribes to the stored state
store.subscribe(function() {
	// should be code here to prevent re-render if currently navigating
	ReactDOM.render(
		<Application state={store.getState()} dispatch={store.dispatch} />,
		APP_NODE
	);
})