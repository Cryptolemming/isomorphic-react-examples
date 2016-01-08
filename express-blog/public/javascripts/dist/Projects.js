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

	var Projects = React.createClass({
		displayName: 'Projects',

		propTypes: {
			source: React.PropTypes.string.isRequired
		},

		getInitialState: function getInitialState() {
			return {
				projects: []
			};
		},

		componentDidMount: function componentDidMount() {
			$.get(this.props.source, (function (result) {
				var projectItems = result.data;
				if (this.isMounted()) {
					this.setState({ projects: projectItems });
				}
			}).bind(this));
		},

		render: function render() {
			var projectItemElements = this.state.projects.map(function (project, index) {
				return React.createElement('li', {
					key: inex,
					style: { listStyleType: 'none' } }, React.createElement('h2', {}, project.name), React.createElement('h5', { style: { marginBottom: '15px' } }, project.date), React.createElement('img', { src: project.picture, style: { width: '250px', marginBottom: '15px', marginLeft: '5px' } }), React.createElement('ul', {}, project.languages.map(function (language) {
					return React.createElement('li', {
						style: {
							listStyleType: 'none',
							display: 'inline',
							paddingRight: '5px',
							opacity: '.8',
							fontSize: '12px'
						} }, language);
				})), React.createElement('p', { style: { marginLeft: '5px', marginBottom: '50px' } }, project.summary));
			});

			return React.createElement('div', {}, React.createElement('ul', {}, projectItemElements));
		}
	});

	ReactDOM.render(React.createElement(Projects, { source: 'http://localhost:3000/api/projects' }), document.getElementById('projects'));

/***/ }
/******/ ]);