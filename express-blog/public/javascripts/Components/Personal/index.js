'use strict';

var Personal = React.createClass({
	getInitialState: function() {
		return {
			personal: {}
		};
	},

	render: function() {
		
		return(
			React.createElement('div', {style: 
				{
					float: 'left',
					background: 'red',
					padding: 2+'vw',
					maxWidth: '120px',
				}}, 
				React.createElement('span', {}, 'personal personal personal')
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Personal),
	document.getElementById('personal')
);