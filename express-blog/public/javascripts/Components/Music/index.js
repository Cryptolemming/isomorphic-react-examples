'use strict';

var Posts = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			music: []
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var musicItems = result.data;
			if (this.isMounted()) {
				this.setState({posts: musicItems});
			}
		}.bind(this));
	},

	render: function() {
		var musicItemElements = this.state.music
			.map(function(song) {
				return React.createElement('li', {},
					React.createElement('h2', {}, song.title),
					React.createElement('h3', {}, song.artist),
					React.createElement('p', {}, song.date),
					React.createElement('iframe', {src: song.link})
				)
			});

		return(
			React.createElement('div', {},
				React.createElement('ul', {}, musicItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/music'}),
	document.getElementById('music')
);