'use strict';

var Nav = React.createClass({
	getInitialState: function() {
		return {
			navItems: {
				home: true,
				posts: false,
				music: false,
				projects: false,
				about: false,
			}
		};
	},

	render: function() {
		return (
			React.createElement('div', {}, 'Nav')
		)
	}
});

ReactDOM.render(
	React.createElement(Nav, {}),
	document.getElementById('nav')
);
