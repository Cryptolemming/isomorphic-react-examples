import FontAwesome from 'react-fontawesome';

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
					height: 100,
					width: 200,
					paddingTop: 5,
					paddingLeft: 15,
					paddingRight: 15,
					marginRight: 35,
					textAlign: 'center',
					wordBreak: 'break-all',
				}}, 
				React.createElement('span', {}, 'personal personal personal dsdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfdsfsdfdsfdsfds'),
				React.createElement('FontAwesome', {name: 'rocket', style: {fontSize: 55, color: 'green'}})
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Personal),
	document.getElementById('personal')
);