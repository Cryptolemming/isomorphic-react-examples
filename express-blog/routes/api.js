var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Song = mongoose.model('Song');
var Project = mongoose.model('Project');

// function to compare the dates of entries for sorting
function compareDates(a, b) {
	if (a.date < b.date)
		return -1;
	else if (a.date > b.date)
		return 1;
	else
		return 0;
}

// filter for most recent entries across types for home page
// var home= postsData.concat(musicData, projectsData).sort(compareDates).slice(0,4);

router
	// Posts API
	.get('/posts', function(req, res) {
		var posts = Post.find().sort({_id: -1});
		posts.find(function(err, posts) {
			res.send(posts);
		});
	})

	.get('/posts/:title', function(req, res) {
		var query = {title: req.params.title};
		Post.findOne(query, function(err, posts) {
			res.send(posts);
		});
	})

	// Music API
	.get('/music', function(req, res) {
		Song.find(function(err, songs) {
			res.send(songs);
		});
	})

	// Project API
	.get('/projects', function(req, res) {
		Project.find(function(err, projects) {
			res.send(projects);
		});
	})

	// Home API
	.get('/home', function(req, res) {
		res.render('home');
	});

module.exports = router;