var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'./public/javascripts/mounttest.js'
	],

	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	module: {
		loaders: [{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	}
};