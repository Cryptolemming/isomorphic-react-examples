var express = require('express');
var router = express.Router();
var session = require('client-sessions');

var mongoose = require('mongoose');
var User = mongoose.model('users');
var Post = mongoose.model('posts');
var Song = mongoose.model('songs');
var Project = mongoose.model('projects');

router
	// Login
	.get('/', function(req, res) {
		res.render('login');
	})

	.post('/', function(req, res) {
		User.findOne({name: req.body.name}, function(err, user) {
			if (!user) {
				res.render('login', {error: 'User not found'});
			} else if (req.body.password === user.password) {
				req.session.user = user;
				res.redirect('/admin/dashboard');
			} else {
				res.render('login', {error: 'Incorrect Password'});
			}
		});
	})

	// Admin dashboard
	.get('/dashboard', function(req, res) {
		if (req.session && req.session.user) {
			User.findOne({name: req.session.user.name}, function(err, user) {
				if (!user) {
					req.session.reset();
					res.redirect('/');
				} else {
					res.locals.users = user;
					res.render('admin');
				}
			})
		} else {
			res.redirect('/');
		}
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


	// Logout
	.get('/logout', function(req, res) {
		req.session.reset();
		req.redirect('/admin');
	});

module.exports = router;