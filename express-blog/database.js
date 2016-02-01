var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
	name: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true}
});

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

userSchema.pre('save', function(next) {
	var user = this;

	// if password is not new or has not been modified move on
	if (!user.isModified('password')) return next();

	// otherwise generate a salt, hash the password and encrypt the input
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

postSchema.pre('save', function (next) {
    this.title_slug = slugify(this.title);
    next(); 
  });

projectSchema.pre('save', function (next) {
    this.name_slug = slugify(this.name);
    next(); 
  });

songSchema.pre('save', function (next) {
    this.title_slug = slugify(this.title);
    next(); 
  });

mongoose.model('users', userSchema);
mongoose.model('posts', postSchema);
mongoose.model('songs', songSchema);
mongoose.model('projects', projectSchema);
mongoose.connect('mongodb://localhost/myblog');