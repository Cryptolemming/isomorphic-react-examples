'use strict';

var Personal = React.createClass({
	getInitialState: function() {
		return {
			personal: {}
		};
	},

	render: function() {
		
		return(
			React.createElement('div', {style: {float: 'left'}}, 
				React.createElement('span', {}, 'personal')
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Personal),
	document.getElementById('personal')
);