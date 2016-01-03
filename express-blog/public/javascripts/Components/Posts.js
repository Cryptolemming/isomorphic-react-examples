'use strict';

var Posts = React.createClass({
	getInitialState: function() {
		return {
			posts: []
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var posts = result.posts;
			if (this.isMounted()) {
				this.setState({posts: posts});
			}
		}.bind(this));
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
			React.createElement('div', {},
				React.createElement('ul', {}, postItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/posts'}),
	document.getElementById('main')
);