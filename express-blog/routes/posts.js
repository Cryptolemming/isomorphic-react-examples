var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = mongoose.model('posts');

router
	.get('/', function(req, res) {
		res.render('posts');
	})

	.get('/:title_slug', function(req, res) {
		var query = {title_slug: req.params.title_slug};
		Post.findOne(query, function(err, post) {
			res.render('post');
		});
	});

	/*
		Post.pre('save or validate', slugify the title)
	 */

module.exports = router;