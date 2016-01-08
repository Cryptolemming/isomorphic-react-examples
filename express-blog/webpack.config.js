var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		Posts: './public/javascripts/Components/Posts/index.js',
		Music: ['./public/javascripts/Components/Music/index.js'],
		Projects: './public/javascripts/Components/Projects/index.js',
		About: './public/javascripts/Components/About/index.js',
		Home: './public/javascripts/Components/Home/index.js',
		Nav: './public/javascripts/Components/Nav/index.js',
	},
	output: {
		path: './public/javascripts/dist',
		filename: '[name].js',
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
	plugins: [
		new webpack.NoErrorsPlugin()
	]
};