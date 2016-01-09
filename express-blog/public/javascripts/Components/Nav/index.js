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

	

	render: function() {
		var navObject = this.state.navItems;
		// map over state navItems and create the nav ul
		var navItemElements = Object.keys(navObject).map(function(value, index) {
			return React.createElement('li', {key: index,
					style: {
						listStyleType: 'none',
						display: 'inline',
						marginRight: '5px',
					}},
				React.createElement('a', {href: 'http://localhost:3000/' + value}, value)
			);
		});

		return (
			React.createElement('div', {style: {marginLeft: '75px'}}, 
				React.createElement('ul', {}, navItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Nav, {}),
	document.getElementById('nav')
);
