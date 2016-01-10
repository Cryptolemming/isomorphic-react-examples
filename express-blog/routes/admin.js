var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('posts');
var Song = mongoose.model('songs');
var Project = mongoose.model('projects');

router
	// Post Forms
	.get('/posts', function(req, res) {
		res.render('admin');
	})

	.post('/posts', function(req, res) {
		new Post({title: req.body.postTitle, body: req.body.body})
			.save(function(err, post) {
				res.redirect('/posts');
			});
	})

	// Song Forms
	.get('/songs', function(req, res) {
		res.render('admin');
	})

	.post('/songs', function(req, res) {
		new Song({title: req.body.songTitle, arist: req.body.artist, link: req.body.link})
			.save(function(err, song) {
				res.redirect('/music');
			});
	})

	// Project Forms
	.get('/projects', function(req, res) {
		res.render('admin');
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