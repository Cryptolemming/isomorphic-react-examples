var Book = React.createClass({
	propTypes: {
		title: React.PropTypes.string.isRequired,
		author: React.PropTypes.string.isRequired,
	},

	render: function() {
		return(
			React.createElement('li', {},
				React.createElement('h2', {}, this.props.title),
				React.createElement('p', {}, this.props.author)
			)
		)
	}
})

var Books = React.createClass({
	propTypes: {
		books: React.PropTypes.array.isRequired,
	},

	render: function() {
		var bookElements = this.props.books
			.map(function(book) {
				return React.createElement(Book, book)
			});
		

		return (
			React.createElement('div', {}, 
				React.createElement('h1', {}, 'Books'),
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