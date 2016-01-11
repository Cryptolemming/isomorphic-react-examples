var moment = require('moment');

'use strict';

var pathname = window.location.pathname;
var projectSlug = pathname.substring(pathname.lastIndexOf('/') + 1);

var Project = React.createClass({
	propTypes: {
		source: React.PropTypes.string.isRequired,
	},

	getInitialState: function() {
		return {
			project: {}
		};
	},

	componentDidMount: function() {
		$.get(this.props.source, function(result) {
			if (this.isMounted()) {
				this.setState({project: result});
			}
		}.bind(this));
	},

	render: function() {
		var project = this.state.project;
		var date = moment(project.date).format('MM[/]DD[/]YYYY');
		return(
			React.createElement('div', {style: {marginLeft: '115px'}},
				React.createElement('h1', {style: {marginTop: '50px'}}, project.name),
				React.createElement('h5', {style: {marginBottom: '15px'}}, date),
				React.createElement('img', {src: project.picture, style: {width: '250px', marginLeft: '5px'}}),
				React.createElement('p', {
						style: {
							opacity: '.8',
							fontSize: '10px',
						}}, project.languages),
				React.createElement('p', {style: {marginLeft: '5px', marginBottom: '50px', marginTop: '25px'}}, project.summary)
			)
		);
	}
});

ReactDOM.render(
	React.createElement(Project, {source: 'http://localhost:3000/api/projects/' + projectSlug}),
	document.getElementById('project')
);