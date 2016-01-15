var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = mongoose.model('users');
var Post = mongoose.model('posts');
var Song = mongoose.model('songs');
var Project = mongoose.model('projects');

router
	.get('/', function(req, res) {
		res.render('login');
	})

	.post('/', function(req, res) {
		User.findOne({name: req.body.name}, function(err, user) {
			if (!user) {
				res.render('login', {error: 'User not found'});
			} else if (req.body.password === user.password) {
				res.redirect('/admin/posts');
			} else {
				res.render('login', {error: 'Incorrect Password'});
			}
		});
	})

	.get('/dashboard', function(req, res) {
		res.render('admin');
	})

	// Post Forms
	.get('/posts', function(req, res) {
		res.render('admin', {title: 'Posts'});
	})

	.post('/posts', function(req, res) {
		new Post({title: req.body.postTitle, body: req.body.body})
			.save(function(err, post) {
				res.redirect('/posts');
			});
	})

	// Song Forms
	.get('/songs', function(req, res) {
		res.render('admin', {title: 'Songs'});
	})

	.post('/songs', function(req, res) {
		new Song({title: req.body.songTitle, arist: req.body.artist, link: req.body.link})
			.save(function(err, song) {
				res.redirect('/music');
			});
	})

	// Project Forms
	.get('/projects', function(req, res) {
		res.render('admin', {title: 'Projects'});
	})

	.post('/projects', function(req, res) {
		new Project({
				name: req.body.projectName,
				picture: req.body.picture,
				languages: req.body.languages,
				summary: req.body.summary
			})
			.save(function(err, project) {
				res.redirect('/projects');
			});
	})

module.exports = router;