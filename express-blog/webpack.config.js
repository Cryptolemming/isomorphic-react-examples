var webpack = require('webpack');
var path = require('path');
var commonsPlugin = 
	new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
	entry: {
		Posts: './public/javascripts/Components/Posts/index.js',
		Post: './public/javascripts/Components/Post/index.js',
		Music: './public/javascripts/Components/Music/index.js',
		Projects: './public/javascripts/Components/Projects/index.js',
		Project: './public/javascripts/Components/Project/index.js',
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
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.es6', '.jsx']
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		commonsPlugin
	]
};