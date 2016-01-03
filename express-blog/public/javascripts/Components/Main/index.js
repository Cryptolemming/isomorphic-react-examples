'use strict';

var Main = React.createClass({

	render: function() {
		var navElements

		return (
			React.createElement('div', {}, 
				React.createElement('ul', {},
					React.createElement('li', {}, window.location.href)
				)
			)
		);
	}
});

ReactDOM.render(
	React.createElement(Main),
	document.getElementById('main')
);