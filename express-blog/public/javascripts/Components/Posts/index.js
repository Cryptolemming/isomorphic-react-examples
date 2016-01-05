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

	render: function() {
		var postItemElements = this.state.posts
			.map(function(post) {
				return React.createElement('li', {
						key: post.key,
						style: {listStyleType: 'none'}},
					React.createElement('h2', {}, post.title),
					React.createElement('h5', {style: {marginBottom: '25px'}}, post.date),
					React.createElement('p', {style: {marginLeft: '5px', marginBottom: '50px'}}, post.body)
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
	document.getElementById('posts')
);

