webpackJsonp([4,9],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var Personal = React.createClass({
		displayName: 'Personal',

		getInitialState: function getInitialState() {
			return {
				personal: {}
			};
		},

		render: function render() {

			return React.createElement('div', { style: { float: 'left' } }, React.createElement('span', {}, 'personal'));
		}
	});

	ReactDOM.render(React.createElement(Personal), document.getElementById('personal'));

/***/ }
]);