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

	var Music = React.createClass({
		displayName: 'Music',

		propTypes: {
			source: React.PropTypes.string.isRequired
		},

		getInitialState: function getInitialState() {
			return {
				music: []
			};
		},

		componentDidMount: function componentDidMount() {
			$.get(this.props.source, (function (result) {
				var musicItems = result.data;
				if (this.isMounted()) {
					this.setState({ music: musicItems });
				}
			}).bind(this));
		},

		render: function render() {
			var musicItemElements = this.state.music.map(function (song) {
				return React.createElement('li', {
					key: song.key,
					style: { listStyleType: 'none' } }, React.createElement('h2', {}, song.artist + ': ' + song.title), React.createElement('h5', { style: { marginBottom: '25px' } }, song.date), React.createElement('iframe', { src: song.link, style: { marginLeft: '5px', marginBottom: '50px' } }));
			});

			return React.createElement('div', {}, React.createElement('ul', {}, musicItemElements));
		}
	});

	ReactDOM.render(React.createElement(Music, { source: 'http://localhost:3000/api/music' }), document.getElementById('music'));

/***/ }
/******/ ]);