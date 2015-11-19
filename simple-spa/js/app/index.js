import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import LoginHandler from '../components/Login.jsx';

let App = React.createClass({
	return() {
		return (
			<div className='nav'>
				<Link to='app'>Home</Link>
				<Link to='login'>Login</Link>

				<RouteHandler />
			</div>
		);
	}
});

let routes = (
	<Route name='app' path='/' handler={App}>
		<Route name='login' path='login' handler={LoginHandler} />
	</Route>
);

Router.run(routes, function(Handler) {
	ReactDOM.render(<Handler/>, document.getElementById('react'));
});