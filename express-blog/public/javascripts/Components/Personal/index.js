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
				React.createElement('a', {href: '/'},
					React.createElement('img', {src: 'https://dl.dropboxusercontent.com/s/ss1o0lsvvoaj1fy/aliayoub.jpg?dl=0',
						style: {
							width: 120,
							borderRadius: 50,
						}
					})
				),
				React.createElement('ul', {style: {listStyleType: 'none', padding: 0, margin: 0, marginTop: 25}},
					<li style={{marginBottom: 15}}>Follow me on <a href='twitter'>Twitter</a></li>,
					<li>Have a look at my  <a href='github'>Github</a></li>,
					<li>Send me an <a href='github'>Email</a></li>
				)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Personal),
	document.getElementById('personal')
);