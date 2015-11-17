import React from 'react';
import ReactDOM from 'react-dom';

let App = React.createClass({
	render() {
		const {name} = this.props;
		return (
			<div>Hello {name}</div>
		);
	}
});

ReactDOM.render(<App name='Ali' />, document.getElementById('react'))