webpackJsonp([0,8],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var About = React.createClass({
		displayName: 'About',

		getInitialState: function getInitialState() {
			return {
				about: {}
			};
		},

		render: function render() {

			return React.createElement('div', {}, 'About Page');
		}
	});

	ReactDOM.render(React.createElement(About), document.getElementById('about'));

/***/ }
]);