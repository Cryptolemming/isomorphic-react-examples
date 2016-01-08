var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
	entry: [
		'./public/javascripts/Components/Posts/index.js'
	],
	target: 'node',
	output: {
		path: path.join(__dirname, '/public/javascripts/'),
		filename: 'bundle.js'
	},
	externals: nodeModules,

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