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
    this.props.onChange(Object.assign({}, this.props.value, {title: e.target.value}));
  },

  onDateChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {date: e.target.value}));
  },

  onBodyChange: function(e) {
    this.props.onChange(Object.assign({}, this.props.value, {body: e.target.value}));
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.refs.title.focus();
    this.props.onSubmit();
  },

  componentDidUpdate: function(prevProps) {
    var value = this.props.value;
    var prevValue = prevProps.value;

    if (this.isMounted && value.errors && value.errors !== prevValue.errors) {
      if (value.errors.title) {
        this.refs.title.focus();
      }
      else if (value.errors.body) {
        this.refs.body.focus();
      }
    }
  },

  render: function() {
    var errors = this.props.value.errors || {};

    return (
      React.createElement('form', {className: 'PostForm', onSubmit: this.onSubmit, noValidate: true},
        React.createElement('input', {
          type: 'text',
          placeholder: 'title',
          value: this.props.value.title,
          onChange: this.onTitleChange,
          ref: 'title',
          autoFocus: true,
        }),
        React.createElement('input', {
          type: 'text',
          placeholder: 'date',
          value: this.props.value.date,
          onChange: this.onDateChange,

        }),
        React.createElement('textarea', {
          type: 'text',
          placeholder: 'body',
          value: this.props.value.body,
          onChange: this.onBodyChange,
          ref: 'body',
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
    state.newPost, {key: state.posts.length + 1, errors: {}});

  if (!post.title) {
    post.errors.title = ['Forgot the post title'];
  }
  if (!post.body) {
    post.errors.body = ['Forgot the post body'];
  }

  setState(
    Object.keys(post.errors).length === 0
      ? {
        newPost: Object.assign({}, POST_TEMPLATE),
        posts: state.posts.slice(0).concat(post),
        }
      : {
        newPost: post,
        }
  );
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
  posts: [],

  newPost: Object.assign({}, POST_TEMPLATE),
});
