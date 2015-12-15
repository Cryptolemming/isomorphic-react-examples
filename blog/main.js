/* Data */

var posts = [
	{key: 1, date: '1', title: 'title 1', body: 'body 1'},
	{key: 2, date: '2', title: 'title 2', body: 'body 2'}
]

var newPost = {
  date: '',
  title: '',
  body: ''
}

/* Components */

var PostItem = React.createClass({
  propTypes: {
    date: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
  },

  render: function() {
    return(
      React.createElement('li', {},
        React.createElement('h2', {}, this.props.title),
        React.createElement('p', {}, 'date: ' + this.props.date),
        React.createElement('p', {}, this.props.body)
      )
    )
  },
});

var PostForm = React.createClass({
  propTypes: {
    post: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      React.createElement('form', {},
        React.createElement('input', {
          type: 'text',
          placeholder: 'title',
          value: this.props.post.title,
        }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'date',
          value: this.props.post.date,
        }),
        React.createElement('textarea', {
          type: 'text',
          placeholder: 'body',
          value: this.props.post.body,
        }),
        React.createElement('button', {
          type: 'submit',
        }, 'Add Post')
      )
    )
  },
})

/* Render */

var postItemElements = posts
  .filter(function(post) {
    return post.date && post.title && post.body
  })
  .map(function(post) {
    return React.createElement(PostItem, post)
  })

var rootElement = 
	React.createElement('div', {},
		React.createElement('h1', {}, 'Posts'),
		React.createElement('ul', {}, postItemElements),
    React.createElement(PostForm, {post: newPost})
	)

var APP_NODE = document.getElementById('main');
ReactDOM.render(rootElement, APP_NODE)