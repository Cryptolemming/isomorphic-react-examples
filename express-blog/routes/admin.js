var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
var User = mongoose.model('users');
var Post = mongoose.model('posts');
var Song = mongoose.model('songs');
var Project = mongoose.model('projects');

// check whether User is logged in
function requireLogin(req, res, next) {
	if (!req.user) {
		req.session.reset();
		res.redirect('/admin');
	} else {
		next();
	}
};

router
	// Register
	.get('/register', requireLogin, function(req, res) {
		res.render('register');
	})

	.post('/register', function(req, res) {
		new User({
			name: req.body.name,
			password: req.body.password
		})
		.save(function(err, user) {
			res.redirect('/admin');
		});
	})

	// Login
	.get('/', function(req, res) {
		res.render('login');
	})

	.post('/', function(req, res) {
		User.findOne({name: req.body.name}, function(err, user) {
			if (!user) {
				res.render('login', {error: 'User not found'});
			} else if (bcrypt.compareSync(req.body.password, user.password)) {
				req.session.user = user;
				res.redirect('/admin/dashboard');
			} else {
				res.render('login', {error: 'Incorrect Password'});
			}
		});
	})	

	/**
	.post('/dashboard', requireLogin, function(req, res) {
		// Depending on which form was filled, create new entry and redirect
		if (req.body.postTitle) {
			
		} else if (req.body.songTitle) {
			new Song({title: req.body.songTitle, arist: req.body.artist, link: req.body.link})
			.save(function(err, song) {
				res.redirect('/music');
			});
		} else if (req.body.projectName) {
			new Project({
				name: req.body.projectName,
				picture: req.body.picture,
				languages: req.body.languages,
				summary: req.body.summary
			})
			.save(function(err, project) {
				res.redirect('/projects');
			});
		} else {
			res.redirect('/');
		}
	})
**/

	// Dashboard
	.get('/dashboard', requireLogin, function(req, res) {
		res.render('admin/dashboard');
	})

	// Dashboard Posts
		// view index
	.get('/dashboard/posts', function(req, res) {
		var postData = Post.find().sort({_id: -1});
		postData.find(function(err, posts) {
			res.render('admin/posts/index', 
				{posts: posts}
			);
		});
	})

		// new post
	.get('/dashboard/posts/new', function(req, res) {
		res.render('admin/posts/new');
	})

	.post('/dashboard/posts/new', function(req, res) {
		new Post({title: req.body.title, body: req.body.body})
			.save(function(err, post) {
				res.redirect('/admin/dashboard/posts');
			});
	})

		// edit post
	.get('/dashboard/posts/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (err)
				console.log(err);
			else if (!post)
				console.log('not found get');
			else
				res.render('admin/posts/post', {title: post.title, body: post.body, title_slug: post.title_slug});
		});
	})

	.put('/dashboard/posts/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (err)
				console.log(err);
			else if (!post)
				console.log('not found put');
			else 
				post.title = req.body.title;
				post.body = req.body.body;
				console.log(post);
				post.save(function(err) {
					console.log(post);
					if(err)
						console.log(err);
					else
						res.redirect('/admin/dashboard/posts/' + post.title_slug);
				});
		});
	})

		// delete post
	.delete('/dashboard/posts/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (!post) {
				console.log('not found delete');
			}
			else {
			 	post.remove(function(err) {
					if(err) {
						console.log(err);
					}
					else {
						res.redirect('/admin/dashboard/posts');
					}
				});
			}
		});
	})
	

	// Dashboard Projects
	

	// Dashboard Music
	

	// Logout
	.get('/logout', function(req, res) {
		req.session.reset();
		res.redirect('/admin');
	});

module.exports = router;