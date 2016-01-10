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

router
	// Posts API
	.get('/posts', function(req, res) {
		var posts = Post.find().sort({_id: -1});
		posts.find(function(err, posts) {
			res.send(posts);
		});
	})

	.get('/posts/:title_slug', function(req, res) {
		var query = {title_slug: req.params.title_slug};
		Post.findOne(query, function(err, post) {
			console.log(post);
			res.send(post);
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