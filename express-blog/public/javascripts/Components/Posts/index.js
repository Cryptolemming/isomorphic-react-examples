import moment from 'moment';
import marked from 'marked';
import Radium from 'radium';
import styles from '../../../stylesheets/styles.js';
import FontAwesome from 'react-fontawesome';

'use strict';

var Posts = Radium(React.createClass({
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
							style: 
								{
									
								}},
						React.createElement('h1', {style: {marginTop: 50, fontSize: 35}}, 
							React.createElement('a', {href: window.location.href + '/' + post.title_slug}, post.title)),
						React.createElement('FontAwesome', {name: 'rocket', style: {fontSize: 55, color: 'green'}}),
						React.createElement('h5', {style: {marginBottom: 50, fontSize: 15}}, date)
					)
				});
			return (
				React.createElement('div', {style: {paddingLeft: 45}},
					React.createElement('ul', {
							style: 
								{
									listStyleType: 'none',
									padding: 0,
									margin: 0,
								}}, postItemElements)
				)
			);
		}
		return null;
	}
}));

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/posts'}),
	document.getElementById('posts')
);