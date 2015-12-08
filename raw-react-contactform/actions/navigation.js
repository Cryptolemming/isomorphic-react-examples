function navigated() {
	normalizedHash = window.location.hash.replace(/^\/?|\/$/g, '');

	if (normalizedHash === '') {
		startNavigating('/contacts')
	}
	else {
		setState({location: normalizedHash.split('/'), transitioning: false});
	}
}

function startNavigating(newURI) {
	var currentURI = window.location.hash.substr(1);

	if (currentURI !== newURI) {
		setState({transitioning: true});

		window.location.replace(
			window.location.pathname + window.location.search + '#' +newURI
		);
	}
}