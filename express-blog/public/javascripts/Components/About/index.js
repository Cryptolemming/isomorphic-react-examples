'use strict';

var About = React.createClass({
	getInitialState: function() {
		return {
			about: {}
		};
	},

	render: function() {
		
		return(
			React.createElement('div', {}, 'About Page')
		)
	}
});

ReactDOM.render(
	React.createElement(About),
	document.getElementById('about')
);