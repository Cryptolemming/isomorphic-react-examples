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
      React.createElement('li', {className: 'PostItem'},
        React.createElement('h2', {className: 'PostItem-title'}, this.props.title),
        React.createElement('p', {className: 'PostItem-date'}, 'date: ' + this.props.date),
        React.createElement('p', {className: 'PostItem-body'}, this.props.body)
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
      React.createElement('form', {className: 'PostForm'},
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

var PostView = React.createClass({
  propTypes: {
    posts: React.PropTypes.array.isRequired,
    newPost: React.PropTypes.object.isRequired,
  },

  render: function() {
    var postItemElements = this.props.posts
      .filter(function(post) {
        return post.date && post.title && post.body
      })
      .map(function(post) {
        return React.createElement(PostItem, post)
      })

    return (
      React.createElement('div', {className: 'PostView'},
        React.createElement('h1', {className: 'PostView-title'}, 'Posts'),
        React.createElement('ul', {className: 'PostView-list'}, postItemElements),
        React.createElement(PostForm, {post: this.props.newPost})
      )
    )
  }
})

/* Render */

var APP_NODE = document.getElementById('main');
ReactDOM.render(
  React.createElement(PostView, {
    posts: posts,
    newPost: newPost
  }),
  APP_NODE
)