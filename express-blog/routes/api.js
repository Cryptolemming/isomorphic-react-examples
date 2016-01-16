var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('posts');
var Song = mongoose.model('songs');
var Project = mongoose.model('projects');

// function to compare the dates of entries for sorting
function compareDates(a, b) {
	if (a.date < b.date)
		return -1;
	else if (a.date > b.date)
		return 1;
	else
		return 0;
}

var postData = Post.find().sort({_id: -1});
var songData = Song.find().sort({_id: -1});
var projectData = Project.find().sort({_id: -1});

router
	// Posts API
	.get('/posts', function(req, res) {
		postData.find(function(err, posts) {
			res.send(posts);
		});
	})

	.get('/posts/:title_slug', function(req, res) {
		var query = {title_slug: req.params.title_slug};
		Post.findOne(query, function(err, post) {
			res.send(post);
		});
	})

	// Music API
	.get('/music', function(req, res) {
		songData.find(function(err, songs) {
			res.send(songs);
		});
	})

	// Project API
	.get('/projects', function(req, res) {
		projectData.find(function(err, projects) {
			res.send(projects);
		});
	})

	.get('/projects/:name_slug', function(req, res) {
		var query = {name_slug: req.params.name_slug};
		Project.findOne(query, function(err, project) {
			res.send(project);
		});
	})

module.exports = router;