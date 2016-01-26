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

	// Admin dashboard
	.get('/dashboard', requireLogin, function(req, res) {
		res.render('admin');
	})

	.post('/dashboard', function(req, res) {
		// Depending on which form was filled, create new entry and redirect
		if (req.body.postTitle) {
			new Post({title: req.body.postTitle, body: req.body.body})
			.save(function(err, post) {
				res.redirect('/posts');
			});
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

	.get('/dashboard/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (err)
				console.log(err);
			else if (!post)
				console.log('not found');
			else
				res.render('admin', {title: post.title, body: post.body, title_slug: post.title_slug});
		});
	})

	.put('/dashboard/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (err)
				console.log(err);
			else if (!post)
				console.log('not found');
			else 
				post.title = req.body.postTitle;
				post.body = req.body.body;
				post.save(function(err) {
					if(err)
						console.log(err);
					else
						res.redirect('/admin/dashboard/' + post.title_slug);
				});
		});
	})

	.delete('/dashboard/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (!post) {
				console.log('not found');
			}
			else {
			 	post.remove(function(err) {
					if(err) {
						console.log(err);
					}
					else {
						res.redirect('/admin/dashboard/');
					}
				});
			}
		});
	})

	// Logout
	.get('/logout', function(req, res) {
		req.session.reset();
		res.redirect('/admin');
	});

module.exports = router;