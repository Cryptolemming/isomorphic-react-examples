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
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);

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

		styles: function styles() {
			return {
				background: 'blue'
			};
		},

		render: function render() {
			var postItemElements = this.state.posts.map(function (post) {
				return React.createElement('li', {}, React.createElement('h2', {}, post.title), React.createElement('p', {}, post.body));
			});

			return React.createElement('div', { style: this.styles }, React.createElement('ul', {}, postItemElements));
		}
	});

	ReactDOM.render(React.createElement(Posts, { source: 'http://localhost:3000/api/posts' }), document.getElementById('posts'));

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ }
/******/ ]);