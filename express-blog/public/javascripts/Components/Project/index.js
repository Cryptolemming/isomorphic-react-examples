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
			project: null
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
		if (this.state.project) {
			var project = this.state.project;
			var date = moment(project.date).format('MM[/]DD[/]YYYY');
			return(
				React.createElement('div', {style: {top: 0, marginTop: 0, height: '100vh', backgroundImage: "url("+project.picture+")", backgroundSize: 'cover', border: '0px solid transparent'}},
					React.createElement('h1', {style: {}}, project.name),
					React.createElement('h5', {style: {marginBottom: '15px', fontSize: 15}}, date),
					React.createElement('p', {
							style: {
								opacity: '.8',
								fontSize: '10px',
							}}, project.languages),
					React.createElement('p', {style: {marginLeft: '5px', marginBottom: '50px', marginTop: '25px'}}, project.summary)
				)
			);
		};
		return null;
	}
});

ReactDOM.render(
	React.createElement(Project, {source: 'http://localhost:3000/api/projects/' + projectSlug}),
	document.getElementById('project')
);