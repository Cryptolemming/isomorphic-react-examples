var express = require('express');
var router = express.Router();

var posts = {
	posts: [
		{key: 1, date: '1', title: 'title 1', body: 'body 1'},
    	{key: 2, date: '2', title: 'title 2', body: 'body 2'}
	]
}

router.get('/', function(req, res) {
	res.send(posts);

});

module.exports = router;