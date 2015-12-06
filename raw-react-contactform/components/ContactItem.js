var ContactItem = React.createClass({
	propTypes: {
		id: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		email: React.PropTypes.string.isRequired,
		description: React.PropTypes.string.isRequired,
	},

	render: function() {
		return (
			React.createElement('div', {className: 'ContactItem'},
				React.createElement('a', {
					className: 'ContactItem-name',
					href: '#/contacts/' + this.props.id,
				}, this.props.name),
				React.createElement('div', {className: 'Contact-email'}, this.props.email),
				React.createElement('div', {className: 'Contact-description'}, this.props.description)
			)
		)
	},
});