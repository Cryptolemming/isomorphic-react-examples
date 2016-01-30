var moment = require('moment');

'use strict';

var Projects = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			projects: null
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			if (this.isMounted()) {
				this.setState({projects: result});
			}
		}.bind(this));
	},

	render: function() {
		if (this.state.projects) {
			var projectItemElements = this.state.projects
				.map(function(project, index) {
					var date = moment(project.date).format('MM-DD-YYYY');
					return React.createElement('li', {
							key: index,
							style: {}
						},
						React.createElement('a', {href: window.location.href + '/' + project.name_slug},
							React.createElement('h1', {style: {marginTop: 50, fontSize: 35}}, project.name)),
						React.createElement('h5', {style: {marginBottom: 25, fontSize: 15}}, date),
						React.createElement('img', {src: project.picture, style: {width: '500px', marginLeft: '5px'}}),
						React.createElement('p', {
								style: {
									opacity: '.8',
									fontSize: '10px',
								}}, project.languages),
						React.createElement('p', {style: {marginLeft: '5px', marginBottom: 50, marginTop: '25px'}}, project.summary)
					)
				});
			return(
				React.createElement('div', {style: {paddingLeft: 45}},
					React.createElement('ul', {
								style: {
									listStyleType: 'none',
									padding: 0,
									margin: 0,
								}}, projectItemElements)
				)
			);
		};
		return null;
	}
});

ReactDOM.render(
	React.createElement(Projects, {source: 'http://localhost:3000/api/projects'}),
	document.getElementById('projects')
);