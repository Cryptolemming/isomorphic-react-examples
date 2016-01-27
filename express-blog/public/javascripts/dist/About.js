webpackJsonp([0,9],[
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

			return React.createElement('div', { style: { marginTop: 50, paddingLeft: 45 } }, 'About Page');
		}
	});

	ReactDOM.render(React.createElement(About), document.getElementById('about'));

/***/ }
]);