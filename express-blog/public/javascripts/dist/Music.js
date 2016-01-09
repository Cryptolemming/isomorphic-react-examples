webpackJsonp([2,6],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var Music = React.createClass({
		displayName: 'Music',

		propTypes: {
			source: React.PropTypes.string.isRequired
		},

		getInitialState: function getInitialState() {
			return {
				music: []
			};
		},

		componentDidMount: function componentDidMount() {
			$.get(this.props.source, (function (result) {
				var musicItems = result.data;
				if (this.isMounted()) {
					this.setState({ music: musicItems });
				}
			}).bind(this));
		},

		render: function render() {
			var musicItemElements = this.state.music.map(function (song, index) {
				return React.createElement('li', {
					key: index,
					style: { listStyleType: 'none' } }, React.createElement('h2', {}, song.artist + ': ' + song.title), React.createElement('h5', { style: { marginBottom: '25px' } }, song.date), React.createElement('iframe', { src: song.link, style: { marginLeft: '5px', marginBottom: '50px' } }));
			});

			return React.createElement('div', {}, React.createElement('ul', {}, musicItemElements));
		}
	});

	ReactDOM.render(React.createElement(Music, { source: 'http://localhost:3000/api/music' }), document.getElementById('music'));

	module.exports = Music;

/***/ }
]);