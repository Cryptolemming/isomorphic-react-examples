
var Posts = React.createClass({
	getInitialState: function() {
		return {
			posts: []
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var result = JSON.parse(result);
			if (this.isMounted()) {
				this.setState(result.data);
			}
		}.bind(this));
	},

	render: function() {
		return(
			React.createElement('div', {}, console.log(this.state.posts))
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/posts'}),
	document.getElementById('main')
);