var moment = require('moment');
var marked = require('marked');
import Styles from '.././stylesheets/styles.js';

'use strict';

var Posts = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			posts: null
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
		if (this.state.posts) {
			var postItemElements = this.state.posts
				.map(function(post, index) {
					var date = moment(post.date).format('MM[/]DD[/]YYYY');
					return React.createElement('li', {
							key: index,
							style: {listStyleType: 'none'}},
						React.createElement('h1', {className: 'title', style: {marginTop: '50px', fontSize: '35px'}}, 
							React.createElement('a', {href: window.location.href + '/' + post.title_slug}, post.title)),
						React.createElement('h5', {style: {marginBottom: '25px'}}, date)
					)
				});
			return (
				React.createElement('div', {style: {background: 'orange'}},
					React.createElement('ul', {}, postItemElements)
				)
			);
		}
		return null;
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/posts'}),
	document.getElementById('posts')
);
