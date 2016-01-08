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

	var Nav = React.createClass({
		displayName: 'Nav',

		getInitialState: function getInitialState() {
			return {
				navItems: {
					'home': true,
					'posts': false,
					'music': false,
					'projects': false,
					'about': false
				}
			};
		},

		_onNavChange: function _onNavChange() {
			// when nav changes map over navItems to set address to true
			// there can only be one true
			// then change state
		},

		render: function render() {
			var navObject = this.state.navItems;
			// map over state navItems and create the nav ul
			var navItemElements = Object.keys(navObject).map(function (value, index) {
				return React.createElement('li', { key: index,
					style: {
						listStyleType: 'none',
						display: 'inline',
						marginRight: '5px'
					} }, React.createElement('a', { href: 'http://localhost:3000/' + value }, value));
			});

			return React.createElement('div', { style: { marginLeft: '75px' } }, React.createElement('ul', {}, navItemElements));
		}
	});

	ReactDOM.render(React.createElement(Nav, {}), document.getElementById('nav'));

/***/ }
/******/ ]);