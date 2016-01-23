webpackJsonp([3,9],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var Nav = React.createClass({
		displayName: 'Nav',

		getInitialState: function getInitialState() {
			return {
				navItems: {
					'posts': false,
					'music': false,
					'projects': false,
					'about': false
				}
			};
		},

		modifyIndex: function modifyIndex() {
			if (this.value === 'home') {
				return this.value = '';
			};
		},

		render: function render() {
			var navObject = this.state.navItems;
			// map over state navItems and create the nav ul
			var navItemElements = Object.keys(navObject).map(function (value, index) {
				return React.createElement('li', {
					key: index,
					style: {
						listStyleType: 'none',
						display: 'inline',
						marginRight: '5px',
						fontSize: '18px'
					} }, React.createElement('a', { href: 'http://localhost:3000/' + value }, value));
			});

			return React.createElement('div', { style: { background: 'yellow' } }, React.createElement('ul', {}, navItemElements));
		}
	});

	ReactDOM.render(React.createElement(Nav, {}), document.getElementById('nav'));

/***/ }
]);