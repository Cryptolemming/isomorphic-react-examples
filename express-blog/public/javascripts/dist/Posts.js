/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var Posts = React.createClass({
		displayName: 'Posts',

		propTypes: {
			source: React.PropTypes.string.isRequired
		},

		getInitialState: function getInitialState() {
			return {
				posts: []
			};
		},

		componentDidMount: function componentDidMount() {
			$.get(this.props.source, (function (result) {
				var postItems = result.data;
				if (this.isMounted()) {
					this.setState({ posts: postItems });
				}
			}).bind(this));
		},

		render: function render() {
			var postItemElements = this.state.posts.map(function (post) {
				return React.createElement('li', {
					key: post.key,
					style: { listStyleType: 'none' } }, React.createElement('h1', { style: { marginTop: '50px' } }, post.title), React.createElement('h4', { style: { marginBottom: '25px' } }, post.date), React.createElement('p', { style: { marginLeft: '5px' } }, post.body));
			});

			return React.createElement('div', { style: { marginLeft: '75px' } }, React.createElement('ul', {}, postItemElements));
		}
	});

	ReactDOM.render(React.createElement(Posts, { source: 'http://localhost:3000/api/posts' }), document.getElementById('posts'));

/***/ }
/******/ ]);