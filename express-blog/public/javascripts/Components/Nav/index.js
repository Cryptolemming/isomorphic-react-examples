'use strict';

var Nav = React.createClass({
	getInitialState: function() {
		return {
			navItems: {
				'home': true,
				'posts': false,
				'music': false,
				'projects': false,
				'about': false,
			}
		};
	},

	_onNavChange: function() {
		// when nav changes map over navItems to set address to true
		// there can only be one true
		// then change state
	},

	render: function() {
		var navObject = this.state.navItems;
		// map over state navItems and create the nav ul
		var navItemElements = Object.keys(navObject).map(function(value, index) {
			return React.createElement('li', {key: index,
					style: {
						listStyleType: 'none',
						display: 'inline',
						margin: '5px',
					}},
				React.createElement('a', {href: 'https://localhost:3000/' + value}, value)
			);
		});

		return (
			React.createElement('div', {}, 
				React.createElement('ul', {}, navItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Nav, {}),
	document.getElementById('nav')
);
