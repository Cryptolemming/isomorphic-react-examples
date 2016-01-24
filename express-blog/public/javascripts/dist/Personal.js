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

			return React.createElement('div', { style: {
					float: 'left',
					background: 'red',
					height: 100 + 'vh',
					width: 200 + 'px',
					paddingTop: 5 + 'px',
					paddingLeft: 15 + 'px',
					paddingRight: 15 + 'px',
					textAlign: 'center',
					wordBreak: 'break-all'
				} }, React.createElement('span', {}, 'personal personal personal dsdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfsdfdsfdsfds'));
		}
	});

	ReactDOM.render(React.createElement(Personal), document.getElementById('personal'));

/***/ }
]);