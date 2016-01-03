'use strict';

var Posts = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			projects: []
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			var projectItems = result.data;
			if (this.isMounted()) {
				this.setState({projects: projectItems});
			}
		}.bind(this));
	},

	render: function() {
		var projectItemElements = this.state.projects
			.map(function(project) {
				return React.createElement('li', {},
					React.createElement('h2', {}, project.name),
					React.createElement('img', {src: project.picture}),
					React.createElement('ul', {}, project.languages.map(function(language) {
						return React.createElement('li', {}, language)
					})),
					React.createElement('p', {}, project.summary)
				)
			});

		return(
			React.createElement('div', {},
				React.createElement('ul', {}, projectItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Posts, {source: 'http://localhost:3000/api/projects'}),
	document.getElementById('projects')
);