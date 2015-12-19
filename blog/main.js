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
    value: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
  },

  onTitleChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {title: e.target.value}))
  },

  onDateChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {date: e.target.value}))
  },

  onBodyChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {body: e.target.value}))
  },

  onPostSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit();
  },

  render: function() {

    return (
      React.createElement('form', {className: 'PostForm'},
        React.createElement('input', {
          className: 'PostForm-title',
          type: 'text',
          placeholder: 'title',
          value: this.props.value.title,
          onInput: this.onTitleChange,
        }),
        React.createElement('input', {
          className: 'PostForm-date',
          type: 'text',
          placeholder: 'date',
          value: this.props.value.date,
          onInput: this.onDateChange,
        }),
        React.createElement('textarea', {
          className: 'PostForm-body',
          type: 'text',
          placeholder: 'body',
          value: this.props.value.body,
          onInput: this.onBodyChange,
        }),
        React.createElement('button', {
          className: 'PostForm-submit',
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
    onNewPostChange: React.PropTypes.func.isRequired,
    onNewPostSubmit: React.PropTypes.func.isRequired,
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
        React.createElement(PostForm, {
          value: this.props.newPost,
          onChange: this.props.onNewPostChange,
          onSubmit: this.props.onNewPostSubmit,
        })
      )
    );
  },
});

/* Constants */

var POST_TEMPLATE = {
  title: '',
  date: '',
  body: '',
  errors: null,
}

/* Actions */

function updateNewPost(post) {
  setState({newPost: post});
}

function submitNewPost() {
  var post = Object.assign({},
    state.newPost, {key: state.posts.keys + 1, errors: {}});

  if (post.title && post.body) {
    setState(
      Object.keys(post.errors).length === 0
        ? {
          newPost: Object.assign({}, POST_TEMPLATE),
          posts: state.posts.slice(0).concat(post),
        }
        : {
          newPost: post
        }
    );
  }
}

/* Model */

var state = {};

function setState(changes) {
  Object.assign(state, changes);

  ReactDOM.render(
    React.createElement(PostView, Object.assign({}, state, {
      onNewPostChange: updateNewPost,
      onNewPostSubmit: submitNewPost,
    })),
    document.getElementById('main')
  );
}

/* Data */

// set initial data
setState({
  posts: [
    {key: 1, date: '1', title: 'title 1', body: 'body 1'},
    {key: 2, date: '2', title: 'title 2', body: 'body 2'}
  ],

  newPost: Object.assign({}, POST_TEMPLATE),
});