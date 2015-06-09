var mongoose = require('mongoose');
var settings = require('../settings');
mongoose.connect('mongodb://ourblog:111111@ds029317.mongolab.com:29317/ourblog')

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

var userModel = mongoose.model('User', userSchema);

function User(user) {
	this.id = user.id;
	this.email = user.email;
	this.nickName = user.nickName;
	this.about = user.about;
	this.signature = user.signature;
	this.lastLoginTime = user.lastLoginTime;
}

module.exports = User;

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

User.prototype.save = function(callback) {
	//要存入数据库的用户信息
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