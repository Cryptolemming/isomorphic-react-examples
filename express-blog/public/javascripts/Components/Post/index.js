var moment = require('moment');

var pathname = window.location.pathname;
var postSlug = pathname.substring(pathname.lastIndexOf('/') + 1);

var Post = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			post: {}
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			if (this.isMounted()) {
				this.setState({post: result});
			}
		}.bind(this));
	},

	render: function() {
		var post = this.state.post;
		var date = moment(post.date).format('MM[/]DD[/]YYYY');
		return (
			React.createElement('div', {style: {marginLeft: '115px'}},
				React.createElement('li', {style: {listStyleType: 'none'}},
					React.createElement('h1', {style: {marginTop: '50px'}}, 
						React.createElement('a', {href: 'http://localhost:3000/posts/' + post.title_slug}, post.title)),
					React.createElement('h5', {style: {marginBottom: '25px'}}, date),
					React.createElement('p', {style: {marginLeft: '5px'}}, post.body)
				)
			)
		);
	}
});

ReactDOM.render(
	React.createElement(Post, {source: 'http://localhost:3000/api/posts/' + postSlug}),
	document.getElementById('post')
);