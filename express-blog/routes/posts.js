var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('posts');

router
	.get('/', function(req, res) {
		res.render('posts');
	})

	.get('/:title_slug', function(req, res) {
		var query = Post.find({title: req.params.title})
		Post.findOne(query, function(err, posts) {
			res.send(posts)
		});
	});

	/*
		Post.pre('save or validate', slugify the title)
	 */

module.exports = router;