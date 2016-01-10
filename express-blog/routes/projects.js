var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Project = mongoose.model('projects');

router
	.get('/', function(req, res) {
		res.render('projects');
	})

	.get('/:name_slug', function(req, res) {
		var query = {name_slug: req.params.name_slug};
		Project.findOne(query, function(err, project) {
			res.render('project');
		});
	});

module.exports = router;