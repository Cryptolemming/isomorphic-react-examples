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

// actors are a sequence of functions called when only when stored state changes
// and taking state object and dispatch function from the store
var actors = [...]

var acting = false;
store.subscribe(function() {
	// we then ensure that actions dispatched by actors do not result in a new actor
	// being dispatched as well, allowing actors to dispatch with impunity
	if (!acting) {
		acting = true
		actors.forEach(function() {
			actor(store.getState(), store.dispatch)
		})
		acting = false
	}
})

// implement renderer as the last actor in the array so it includes results of previously dispatched
// actors in the render
function renderer(state, dispatch) {
	ReactDOM.render(
		<Application state={state} dispatch={dispatch} />,
		APP_NODE
	)
}

// Application component example to select views
function Application(props) {
	const location = props.state.navigation.location;

	switch (location.name) {
		case 'documentEdit':
			return <DocumentContainer {...props} id={location.options.id} />
		case 'documentList':
			return <DocumentListContainer {...props} id={location.options.id} />

		default:
			return <div>Not Found</div>
	}
}
Application.propTypes = {
	state: React.PropTypes.object.isRequired,
	dispatch: React.PropTypes.func.isRequired,
}

