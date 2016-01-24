var moment = require('moment');

'use strict';

var Music = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			music: null
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			if (this.isMounted()) {
				this.setState({music: result});
			}
		}.bind(this));
	},

	render: function() {
		if (this.state.music) {
			var musicItemElements = this.state.music
				.map(function(song, index) {
					var date = moment(song.date).format('MM-DD-YYYY');
					return React.createElement('li', {
							key: index,
							style: {listStyleType: 'none'}},
						React.createElement('h1', {style: {marginTop: '50px'}}, song.artist + ': ' + song.title),
						React.createElement('h5', {style: {marginBottom: '25px'}}, date),
						React.createElement('iframe', {src: song.link, style: {marginLeft: '5px', marginBottom: '50px'}})
					)
				});

			return(
				React.createElement('div', {style: {background: 'orange'}},
					React.createElement('ul', {}, musicItemElements)
				)
			);
		};
		return null;
	}
});

ReactDOM.render(
	React.createElement(Music, {source: 'http://localhost:3000/api/music'}),
	document.getElementById('music')
);

module.exports = Music;