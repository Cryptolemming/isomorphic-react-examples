var request = require('request');

var Posts = React.createClass({
	getInitialState: function() {
		return {
			posts: []
		};
	},

	componentDidMount: function() {
		request('http://localhost:3000/posts', function(error, response, body) {
			var result = JSON.parse(body);
			if (this.isMounted()) {
				this.setState({posts: result.posts});
			}
		})
	},

	render: function() {
		return(
			React.createElement('div', {}, this.state.posts)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {}),
	document.getElementById('main')
);