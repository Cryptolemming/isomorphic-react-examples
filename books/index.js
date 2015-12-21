var React = require('react');
var ReactDOM = require('react-dom');

var Books = React.createClass({
	propTypes: {
		books: React.PropTypes.array.isRequired,
	},

	render: function() {
		var bookElements = this.props.books
			.map(function(book) {
				React.createElement('li', {},
					React.createElement('h2', {}, book.title),
					React.createElement('p', {}, book.author)
				)
			});

		return (
			React.createElement('div', {}, 
				React.createElement('ul', {}, bookElements)
			)
		);
	},	
});

var data = [
	{title: 'Life of Pi', author: 'Yann Martel'},
	{title: 'Ender"s Game', author: 'Orson Scott Card'}
]

ReactDOM.render(
	React.createElement(Books, {
		books: data}),
	document.getElementById('main'));