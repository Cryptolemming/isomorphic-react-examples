var moment = require('moment');

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
			var postItems = result;
			if (this.isMounted()) {
				this.setState({posts: postItems});
			}
		}.bind(this));
	},

	render: function() {
		var postItemElements = this.state.posts
			.map(function(post, index) {
				var date = moment(post.date).format('MM[/]DD[/]YYYY');
				return React.createElement('li', {
						key: index,
						style: {listStyleType: 'none'}},
					React.createElement('h1', {style: {marginTop: '50px'}}, 
						React.createElement('a', {href: 'http://localhost:3000/posts/ ' + post.title}, post.title)),
					React.createElement('h5', {style: {marginBottom: '25px'}}, date),
					React.createElement('p', {style: {marginLeft: '5px'}}, post.body)
				)
			});

		return(
			React.createElement('div', {style: {marginLeft: '75px'}},
				React.createElement('ul', {}, postItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/posts'}),
	document.getElementById('posts')
);

