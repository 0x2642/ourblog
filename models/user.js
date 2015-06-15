var mongoose = require('mongoose');
var settings = require('../settings');
// Connect mongodb by url method
mongoose.connect(settings.mongodbUrl);

// Define user schema
var userSchema = new mongoose.Schema({
	id: Number,
	email: String,
	nickName: String,
	about: String,
	signature: String,
	lastLoginTime: Date
}, {
	collection: 'users'
});

// Create Schema Model
var userModel = mongoose.model('User', userSchema);

// Create User class
function User(user) {
	this.id = user.id;
	this.email = user.email;
	this.nickName = user.nickName;
	this.about = user.about;
	this.signature = user.signature;
	this.lastLoginTime = user.lastLoginTime;
}

module.exports = User;

// Get user from db by email
User.getUser = function(email, callback) {
	userModel.findOne({
		email: email
	}, function(err, user) {
		if (err) {
			return callback(err);
		}
		callback(null, user);
	})
}

// Save user information
User.prototype.save = function(callback) {
	// user information
	var user = {
		id: this.id,
		email: this.email,
		nickName: this.nickName,
		about: this.about,
		signature: this.signature,
		lastLoginTime: this.lastLoginTime,
	};

	var newUser = new userModel(user);

	newUser.save(function(err, user) {
		if (err) {
			return callback(err);
		}
		callback(null, user);
	});
};