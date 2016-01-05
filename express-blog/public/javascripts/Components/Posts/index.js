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
		var postItemElements = this.state.posts
			.map(function(post) {
				return React.createElement('li', {},
					React.createElement('h2', {}, post.title),
					React.createElement('p', {}, post.body)
				)
			});

		return(
			React.createElement('div', {style: this.styles},
				React.createElement('ul', {}, postItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/posts'}),
	document.getElementById('posts')
);