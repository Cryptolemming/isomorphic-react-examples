webpackJsonp([4,6],[
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var Posts = React.createClass({
		displayName: 'Posts',

		propTypes: {
			source: React.PropTypes.string.isRequired
		},

		getInitialState: function getInitialState() {
			return {
				posts: []
			};
		},

		componentDidMount: function componentDidMount() {
			$.get(this.props.source, (function (result) {
				var postItems = result.data;
				if (this.isMounted()) {
					this.setState({ posts: postItems });
				}
			}).bind(this));
		},

		render: function render() {
			var postItemElements = this.state.posts.map(function (post, index) {
				return React.createElement('li', {
					key: index,
					style: { listStyleType: 'none' } }, React.createElement('h1', { style: { marginTop: '50px' } }, post.title), React.createElement('h4', { style: { marginBottom: '25px' } }, post.date), React.createElement('p', { style: { marginLeft: '5px' } }, post.body));
			});

			return React.createElement('div', { style: { marginLeft: '75px' } }, React.createElement('ul', {}, postItemElements));
		}
	});

	ReactDOM.render(React.createElement(Posts, { source: 'http://localhost:3000/api/posts' }), document.getElementById('posts'));

/***/ }
]);