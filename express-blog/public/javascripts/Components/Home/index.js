'use strict';

var Home = React.createClass({
	getInitialState: function() {
		return {
			home: []
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			if (this.isMounted()) {
				this.setState({home: result});
			}
		}.bind(this));
	},

	render: function() {
		return(
			React.createElement('div', {}, this.state.home)
		)
		
	}
});

ReactDOM.render(
	React.createElement(Home, {source: 'https://localhost:3000/api/home'}),
	document.getElementById('home')
);
