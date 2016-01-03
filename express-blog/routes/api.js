var express = require('express');
var router = express.Router();

var posts = {
	data: [
		{key: 1, date: '1', title: 'title 1', body: 'body 1'},
    	{key: 2, date: '2', title: 'title 2', body: 'body 2'}
	]
}

var music = {
	data: [
		{key: 1, date: '1', artist: 'artist 1', title: 'title 1'},
		{key: 2, date: '2', artist: 'artist 2', title: 'title 2'}
	]
}

var projects = {
	data: [
		{key: 1, date: '1', name: 'project 1', picture: 'picture 1',
			languages: ['language 1', 'language 2'], summary: 'summary 1'},
		{key: 2, date: '2', name: 'project 2', picture: 'picture 2',
			languages: ['language 1', 'language 2'], summary: 'summary 2'},
	]
}

router
	// Posts API
	.get('/posts', function(req, res) {
		res.send(posts);
	})

	// Music API
	.get('/music', function(req, res) {
		res.send(music);
	})

	// Project API
	.get('/projects', function(req, res) {
		res.send(projects);
	});

module.exports = router;