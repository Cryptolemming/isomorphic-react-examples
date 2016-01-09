var moment = require('moment');

'use strict';

var Projects = React.createClass({
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
			if (this.isMounted()) {
				this.setState({projects: result});
			}
		}.bind(this));
	},

	render: function() {
		var projectItemElements = this.state.projects
			.map(function(project, index) {
				var date = moment(project.date).format('MM-DD-YYYY');
				return React.createElement('li', {
						key: index,
						style: {listStyleType: 'none'}},
					React.createElement('h1', {style: {marginTop: '50px'}}, project.name),
					React.createElement('h5', {style: {marginBottom: '15px'}}, date),
					React.createElement('img', {src: project.picture, style: {width: '250px', marginBottom: '15px', marginLeft: '5px'}}),
					React.createElement('ul', {}, project.languages.map(function(language) {
						return React.createElement('li', {
							style: {
								listStyleType: 'none',
								display: 'inline',
								paddingRight: '5px',
								opacity: '.8',
								fontSize: '12px',
							}}, language)
					})),
					React.createElement('p', {style: {marginLeft: '5px', marginBottom: '50px'}}, project.summary)
				)
			});

		return(
			React.createElement('div', {style: {marginLeft: '75px'}},
				React.createElement('ul', {}, projectItemElements)
			)
		)
	}
});

ReactDOM.render(
	React.createElement(Projects, {source: 'http://localhost:3000/api/projects'}),
	document.getElementById('projects')
);