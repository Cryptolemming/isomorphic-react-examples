var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
	date: {type: Date, default: new Date()},
	title: String,
	body: String
});

var Song = new Schema({
	date: {type: Date, default: new Date()},
	artist: String,
	title: String,
	link: String
});

var Project = new Schema({
	date: {type: Date, default: new Date()},
	name: String,
	picture: String,
	languages: Array,
	summary: String
});

mongoose.model('posts', Post);
mongoose.model('music', Song);
mongoose.model('projects', Project);
mongoose.connect('mongodb://localhost/myblog');