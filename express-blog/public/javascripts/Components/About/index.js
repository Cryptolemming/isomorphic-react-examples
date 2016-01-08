'use strict';

var About = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			about: {}
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var musicItems = result.data;
			if (this.isMounted()) {
				this.setState({music: musicItems});
			}
		}.bind(this));
	},

	render: function() {
		
		return(
			React.createElement('div', {},
				React.createElement('ul', {})
			)
		)
	}
});

ReactDOM.render(
	React.createElement(About, {source: 'http://localhost:3000/api/about'}),
	document.getElementById('about')
);