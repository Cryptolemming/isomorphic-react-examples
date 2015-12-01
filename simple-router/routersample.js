function navigated(

	var component = window.location.hash === '#/'
		? React.createElement('div', {}, 'Index Page')
		: React.createElement('div', {}, 'Not Found');

	ReactDOM.render(
		component, 
		document.getElementById('react-app')
	);
)

window.addEventListener('hashchange', navigated, false);