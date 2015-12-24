var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'./public/javascripts/mounttest.js'
	],

	output: {
		path: __dirname + '/javascripts/',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{ 
				test: /\.js?$/,
				loaders: ['babel'],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.json$/, loader: 'json-loader'
			}
		]
	},
	node: {
	    console: 'empty',
	    fs: 'empty',
	    net: 'empty',
	    tls: 'empty'
	 },

	plugins: [
		new webpack.NoErrorsPlugin()
	]
};