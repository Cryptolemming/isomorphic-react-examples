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

// filter for most recent entries across types for home page
// var home= postsData.concat(musicData, projectsData).sort(compareDates).slice(0,4);

var homeData = []
var homeDataCollection = homeData.concat(postData, songData, projectData).sort(compareDates).slice(0,4);

var postData = Post.find().sort({_id: -1}).limit(5);
var songData = Song.find().sort({_id: -1}).limit(5);
var projectData = Project.find().sort({_id: -1}).limit(5);

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
		var songs = Song.find().sort({_id: -1});
		songs.find(function(err, song) {
			res.send(song);
		});
	})

	// Project API
	.get('/projects', function(req, res) {
		var projects = Project.find().sort({_id: -1});
		projects.find(function(err, projects) {
			res.send(projects);
		});
	})

	.get('/projects/:name_slug', function(req, res) {
		var query = {name_slug: req.params.name_slug};
		Project.findOne(query, function(err, project) {
			res.send(project);
		});
	})

	// Home API
	.get('/home', function(req, res) {
		res.send(homeDataCollection);
	});

module.exports = router;