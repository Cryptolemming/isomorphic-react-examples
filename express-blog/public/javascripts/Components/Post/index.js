var moment = require('moment');
var marked = require('marked');

'use strict';

var pathname = window.location.pathname;
var postSlug = pathname.substring(pathname.lastIndexOf('/') + 1);

var Post = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			post: null
		};
	},

	getDefaultProps: function() {
		return {
			source: 'http://localhost:3000/api/posts/' + postSlug
		};
	},

	componentWillMount: function() {
		$.get(this.props.source, function(result) {
			if (this.isMounted()) {
				this.setState({post: result});
			}
		}.bind(this));
	},

	rawMarkup: function() {
	    var rawMarkup = marked(this.state.post.body, {sanitize: true});
	    return { __html: rawMarkup };
	 },

	render: function() {
		if (this.state.post) {
			var post = this.state.post;
			var date = moment(post.date).format('MM[/]DD[/]YYYY');
			return (
				React.createElement('div', {style: {paddingLeft: '45px'}},
					React.createElement('h1', {style: {marginTop: 50, fontSize: '35px'}}, post.title),
					React.createElement('h5', {style: {marginBottom: '25px', fontSize: 15}}, date),
					React.createElement('span', {dangerouslySetInnerHTML: this.rawMarkup()})
				)
			);
		 }
		 return null;
	}
});

ReactDOM.render(
	React.createElement(Post, {}),
	document.getElementById('post')
);

module.exports = Post;