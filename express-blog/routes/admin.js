var express = require('express');
var router = express.Router();
var session = require('client-sessions');
var bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
var User = mongoose.model('users');
var Post = mongoose.model('posts');
var Song = mongoose.model('songs');
var Project = mongoose.model('projects');

// check whether User is logged in
function requireLogin(req, res, next) {
	if (!req.user) {
		req.session.reset();
		res.redirect('/admin');
	} else {
		next();
	}
};

router
	// Register
	.get('/register', requireLogin, function(req, res) {
		res.render('register');
	})

	.post('/register', function(req, res) {
		new User({
			name: req.body.name,
			password: req.body.password
		})
		.save(function(err, user) {
			res.redirect('/admin');
		});
	})

	// Login
	.get('/', function(req, res) {
		res.render('login');
	})

	.post('/', function(req, res) {
		User.findOne({name: req.body.name}, function(err, user) {
			if (!user) {
				res.render('login', {error: 'User not found'});
			} else if (bcrypt.compareSync(req.body.password, user.password)) {
				req.session.user = user;
				res.redirect('/admin/dashboard');
			} else {
				res.render('login', {error: 'Incorrect Password'});
			}
		});
	})	

	// Dashboard
	.get('/dashboard/', requireLogin, function(req, res) {
		res.render('admin/dashboard');
	})

	// Dashboard Posts
		// view index
	.get('/dashboard/posts', function(req, res) {
		var postData = Post.find().sort({_id: -1});
		postData.find(function(err, posts) {
			res.render('admin/posts/index', 
				{posts: posts}
			);
		});
	})

		// new post
	.get('/dashboard/posts/new', function(req, res) {
		res.render('admin/posts/new');
	})

	.post('/dashboard/posts/new', function(req, res) {
		new Post({title: req.body.title, body: req.body.body})
			.save(function(err, post) {
				res.redirect('/admin/dashboard/posts');
			});
	})

		// edit post
	.get('/dashboard/posts/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (err)
				console.log(err);
			else if (!post)
				console.log('not found');
			else
				res.render('admin/posts/post', {title: post.title, body: post.body, title_slug: post.title_slug});
		});
	})

	.put('/dashboard/posts/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (err)
				console.log(err);
			else if (!post)
				console.log('not found');
			else 
				post.title = req.body.title;
				post.body = req.body.body;
				console.log(post);
				post.save(function(err) {
					if(err)
						console.log(err);
					else
						res.redirect('/admin/dashboard/posts/' + post.title_slug);
				});
		});
	})

		// delete post
	.delete('/dashboard/posts/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Post.findOne(query, function(err, post) {
			if (!post) {
				console.log('not found');
			}
			else {
			 	post.remove(function(err) {
					if(err) {
						console.log(err);
					}
					else {
						res.redirect('/admin/dashboard/posts');
					}
				});
			}
		});
	})
	

	// Dashboard Projects
			// view index
	.get('/dashboard/projects', function(req, res) {
		var projectData = Project.find().sort({_id: -1});
		projectData.find(function(err, projects) {
			res.render('admin/projects/index', 
				{projects: projects}
			);
		});
	})

		// new project
	.get('/dashboard/projects/new', function(req, res) {
		res.render('admin/projects/new');
	})

	.post('/dashboard/projects/new', function(req, res) {
		new Project(
			{
				name: req.body.name,
				picture: req.body.picture,
				languages: req.body.languages,
				summary: req.body.summary
			})
			.save(function(err, project) {
				if(err) {
					console.log(err);
				};
				res.redirect('/admin/dashboard/projects');
			});
	})

		// edit project
	.get('/dashboard/projects/:name_slug', function(req, res) {
		var query = {'name_slug': req.params.name_slug};
		Project.findOne(query, function(err, project) {
			if (err)
				console.log(err);
			else if (!project)
				console.log('not found');
			else
				res.render('admin/projects/project', 
					{
						name: project.name,
						picture: project.picture,
						languages: project.languages,
						summary: project.summary,
						name_slug: project.name_slug,
					});
		});
	})

	.put('/dashboard/projects/:name_slug', function(req, res) {
		var query = {'name_slug': req.params.name_slug};
		Project.findOne(query, function(err, project) {
			if (err)
				console.log(err);
			else if (!project)
				console.log('not found');
			else 
				project.name = req.body.name;
				project.picture = req.body.picture;
				project.languages = req.body.languages;
				project.summary = req.body.summary;
				project.save(function(err) {
					if(err)
						console.log(err);
					else
						res.redirect('/admin/dashboard/projects/' + project.name_slug);
				});
		});
	})

		// delete project
	.delete('/dashboard/projects/:name_slug', function(req, res) {
		var query = {'name_slug': req.params.name_slug};
		Project.findOne(query, function(err, project) {
			if (!project) {
				console.log('not found');
			}
			else {
			 	project.remove(function(err) {
					if(err) {
						console.log(err);
					}
					else {
						res.redirect('/admin/dashboard/projects');
					}
				});
			}
		});
	})

	// Dashboard Music
		// view index
	.get('/dashboard/music', function(req, res) {
		var songData = Song.find().sort({_id: -1});
		songData.find(function(err, songs) {
			res.render('admin/music/index', 
				{songs: songs}
			);
		});
	})

	// new song
	.get('/dashboard/music/new', function(req, res) {
		res.render('admin/music/new');
	})

	.post('/dashboard/music/new', function(req, res) {
		new Song({title: req.body.title, link: req.body.link})
			.save(function(err, song) {
				res.redirect('/admin/dashboard/music');
			});
	})

	// edit song
	.get('/dashboard/music/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Song.findOne(query, function(err, song) {
			if (err)
				console.log(err);
			else if (!song)
				console.log('not found');
			else
				res.render('admin/music/song', {title: song.title, link: song.link, title_slug: song.title_slug});
		});
	})

	.put('/dashboard/music/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Song.findOne(query, function(err, song) {
			if (err)
				console.log(err);
			else if (!song)
				console.log('not found');
			else 
				song.title = req.body.title;
				song.link = req.body.link;
				song.save(function(err) {
					if(err)
						console.log(err);
					else
						res.redirect('/admin/dashboard/music/' + song.title_slug);
				});
		});
	})

	// delete song
	.delete('/dashboard/music/:title_slug', function(req, res) {
		var query = {'title_slug': req.params.title_slug};
		Song.findOne(query, function(err, song) {
			if (!song) {
				console.log('not found');
			}
			else {
			 	song.remove(function(err) {
					if(err) {
						console.log(err);
					}
					else {
						res.redirect('/admin/dashboard/music');
					}
				});
			}
		});
	})

	// Logout
	.get('/logout', function(req, res) {
		req.session.reset();
		res.redirect('/admin');
	});

module.exports = router;