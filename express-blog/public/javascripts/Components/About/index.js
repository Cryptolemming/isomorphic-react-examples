'use strict';

var About = React.createClass({
	getInitialState: function() {
		return {
			about: {}
		};
	},

	render: function() {
		
		return(
			React.createElement('div', {style: {marginTop: 50, paddingLeft: 45}}, 'About Page')
		)
	}
});

ReactDOM.render(
	React.createElement(About),
	document.getElementById('about')
);