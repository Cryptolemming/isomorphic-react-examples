var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: [
		'webpack/hot/only-dev-server',
		'./js/app'
	],

	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{ 
				test: /\.js?$/,
				loaders: ['react-hot', 'babel'],
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
			}
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};