var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('posts');

router
	// Forms
	.get('/', function(req, res) {
		res.render('admin');
	})

	.post('/', function(req, res) {
		new Post({title: req.body.postTitle, body: req.body.body})
			.save(function(err, post) {
				console.log(post);
				res.redirect('/posts');
			});
	});

module.exports = router;