webpackJsonp([1,8],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var Home = React.createClass({
		displayName: 'Home',

		getInitialState: function getInitialState() {
			return {
				source: []
			};
		},

		componentDidMount: function componentDidMount() {
			$.get(this.props.source, (function (result) {
				if (this.isMounted()) {
					this.setState({ source: result });
				}
			}).bind(this));
		},

		render: function render() {

			var newestEntries = this.state.source.map(function (entry) {
				return entry.slice(0, 5);
			});

			var homeItemElements = this.state.source.map(function (item, index) {
				if (item.artist) {
					var song = item;
					return React.createElement('li', {
						key: index,
						style: { listStyleType: 'none' } }, React.createElement('h2', {}, song.artist + ': ' + song.title), React.createElement('h5', { style: { marginBottom: '25px' } }, song.date), React.createElement('iframe', { src: song.link, style: { marginLeft: '5px', marginBottom: '50px' } }));
				} else if (item.summary) {
					var project = item;
					return React.createElement('li', {
						key: index,
						style: { listStyleType: 'none' } }, React.createElement('h2', {}, project.name), React.createElement('h5', { style: { marginBottom: '15px' } }, project.date), React.createElement('img', { src: project.picture, style: { width: '250px', marginBottom: '15px', marginLeft: '5px' } }), React.createElement('ul', {}, project.languages.map(function (language) {
						return React.createElement('li', {
							style: {
								listStyleType: 'none',
								display: 'inline',
								paddingRight: '5px',
								opacity: '.8',
								fontSize: '12px'
							} }, language);
					})), React.createElement('p', { style: { marginLeft: '5px', marginBottom: '50px' } }, project.summary));
				} else {
					var post = item;
					return React.createElement('li', {
						key: index,
						style: { listStyleType: 'none' } }, React.createElement('h1', { style: { marginTop: '50px' } }, post.title), React.createElement('h4', { style: { marginBottom: '25px' } }, post.date), React.createElement('p', { style: { marginLeft: '5px' } }, post.body));
				}
			});

			return React.createElement('div', {}, newestEntries);
		}
	});

	ReactDOM.render(React.createElement(Home, { source: ['http://localhost:3000/api/posts', 'http://localhost:3000/api/music', 'http://localhost:3000/api/projects'] }), document.getElementById('home'));

/***/ }
]);