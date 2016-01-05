'use strict';

var Posts = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			posts: []
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var postItems = result.data;
			if (this.isMounted()) {
				this.setState({posts: postItems});
			}
		}.bind(this));
	},

	styles: function() {
		return {
			background: 'blue',
		};
	},

	render: function() {
		var styles = this.styles;

		var postItemElements = this.state.posts
			.map(function(post) {
				return React.createElement('li', {key: post.key},
					React.createElement('h2', {}, post.title),
					React.createElement('p', {}, post.body)
				)
			});

		return(
			React.createElement('div', {style: {styles}},
				React.createElement('ul', {}, postItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/posts'}),
	document.getElementById('posts')
);