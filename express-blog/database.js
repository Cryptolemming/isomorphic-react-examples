var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
	date: {type: Date, default: new Date()},
	title: String,
	body: String
});

mongoose.model('posts', Post);
mongoose.connect('mongodb://localhost/myblog');