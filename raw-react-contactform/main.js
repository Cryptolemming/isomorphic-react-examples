var CONTACT_TEMPLATE = {
	name: '',
	email: '',
	description: '',
	errors: null,
};

// Initial state
var state = {
	transitioning: false,
	location: null,
	contacts: [
		{key: '1', name: 'Jerry Seinfeld', email: 'jerry@seinfeld.com', description: 'Snapple?'},
		{key: '2', name: 'George Costanza', email: 'george@costanza.com', description: 'Kruger Industrial Smooting'},
	],
	contactForms: {},
	newContactForm: Object.assign({}, CONTACT_TEMPLATE),
};

function setState(changes) {
	Object.assign(state, changes);

	if (!state.transitioning) {
		ReactDOM.render(
			React.createElement(Application, state),
			document.getElementById('react-app')
		);
	}
}

window.addEventListener('hashchange', navigated, false);

navigated();