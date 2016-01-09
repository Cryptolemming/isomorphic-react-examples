var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('posts');

var posts = {
	data: [
		{date: '1', title: 'title 1', body: 'body 1'},
    	{date: '2', title: 'title 2', body: 'body 2'}
	]
}

var music = {
	data: [
		{date: '1', artist: 'artist 1', title: 'title 1',
			link: 'https://www.youtube.com/embed/wfd6eNx8Sxk?autoplay=0'},
		{date: '2', artist: 'artist 2', title: 'title 2',
			link: 'https://www.youtube.com/embed/wfd6eNx8Sxk?autoplay=0'}
	]
}

var projects = {
	data: [
		{date: '1', name: 'project 1',
			picture: 'http://www.cupecoybeachclub.com/wp-content/uploads/2012/07/Cupecoy-Beach-Background.jpg',
			languages: ['language 1', 'language 2'], summary: 'summary 1'},
		{date: '2', name: 'project 2',
			picture: 'https://s3.amazonaws.com/rapgenius/tumblr_m2mbniLKtl1rn0y7so1_500.gif',
			languages: ['language 1', 'language 2'], summary: 'summary 2'},
	]
}

// function to compare the dates of entries for sorting
function compareDates(a, b) {
	if (a.date < b.date)
		return -1;
	else if (a.date > b.date)
		return 1;
	else
		return 0;
}

var postsData = posts.data;
var musicData = music.data;
var projectsData = projects.data;
var home= postsData.concat(musicData, projectsData).sort(compareDates).slice(0,4);

router
	// Posts API
	.get('/posts', function(req, res) {
		Post.find(function(err, posts) {
			console.log(posts);
			res.send(posts);
		});
	})

	// Music API
	.get('/music', function(req, res) {
		res.send(music);
	})

	// Project API
	.get('/projects', function(req, res) {
		res.send(projects);
	})

	// Home API
	.get('/home', function(req, res) {
		res.send(home);
	});

module.exports = router;