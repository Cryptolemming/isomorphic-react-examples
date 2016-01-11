var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	date: {type: Date, default: new Date()},
	title: String,
	title_slug: String,
	body: String
});

var songSchema = new Schema({
	date: {type: Date, default: new Date()},
	artist: String,
	title: String,
	title_slug: String,
	link: String
});

var projectSchema = new Schema({
	date: {type: Date, default: new Date()},
	name: String,
	name_slug: String,
	picture: String,
	languages: String,
	summary: String
});

function slugify(text) {

return text.toString().toLowerCase()
  .replace(/\s+/g, '-')        // Replace spaces with -
  .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
  .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  .replace(/^-+/, '')          // Trim - from start of text
  .replace(/-+$/, '');         // Trim - from end of text
}

postSchema.pre('save', function (next) {
    this.title_slug = slugify(this.title);
    next(); 
  });

projectSchema.pre('save', function (next) {
    this.name_slug = slugify(this.name);
    next(); 
  });

mongoose.model('posts', postSchema);
mongoose.model('songs', songSchema);
mongoose.model('projects', projectSchema);
mongoose.connect('mongodb://localhost/myblog');