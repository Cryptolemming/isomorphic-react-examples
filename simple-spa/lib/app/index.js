'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _Login = require('../components/Login.js');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
	displayName: 'App',
	return: function _return() {
		return _react2.default.createElement(
			'div',
			{ className: 'nav' },
			_react2.default.createElement(
				_reactRouter.Link,
				{ to: 'app' },
				'Home'
			),
			_react2.default.createElement(
				_reactRouter.Link,
				{ to: 'login' },
				'Login'
			),
			_react2.default.createElement(_reactRouter.RouteHandler, null)
		);
	}
});

var routes = _react2.default.createElement(
	_reactRouter.Route,
	{ name: 'app', path: '/', handler: App },
	_react2.default.createElement(_reactRouter.Route, { name: 'login', path: 'login', handler: _Login2.default })
);

_reactRouter2.default.run(routes, function (Handler) {
	_reactDom2.default.render(_react2.default.createElement(Handler, null), document.getElementById('react'));
});