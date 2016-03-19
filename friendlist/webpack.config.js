var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['es2015', 'stage-0', 'react-hot'],
        plugins: ["transform-decorators-legacy"],
        include: path.join(__dirname, 'src')
      },
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
